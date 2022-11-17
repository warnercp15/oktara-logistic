import { LngLatBounds, Marker, Popup } from "mapbox-gl";
import { directionsApi } from "../../apis";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PackageContext } from "../packages/PackageContext";
import { useContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { shipments } = useContext(PackageContext);

  const setMap = (map) => {
    const myLocationPopup = new Popup().setHTML(`
      <h4>We are here</h4>
    `);
    new Marker({
      color: "#000000",
    })
    .setLngLat(map.getCenter())
    .setPopup(myLocationPopup)
    .addTo(map);

    dispatch({
      type: "setMap",
      payload: map,
    });
  };

  const getRouteBetweenPoints = async (
    start ,
    route 
  ) => {
    const response = await directionsApi.get(`/${route}`);
    const { geometry } = response.data.routes[0];
    const { coordinates: coords } = geometry;
    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    const sourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);
    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  };

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }
    const newMarkers = [];
    for (const shipment of shipments) {
      const [lng, lat] = shipment.location.center;
      const popup = new Popup().setHTML(`
        <h6>${shipment.location.text_es}</h6>
        <p>${shipment.location.place_name_es}</p>
      `);
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map);
      newMarkers.push(newMarker);
    }
    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [shipments]);

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};