import React, { useContext, useLayoutEffect, useRef } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import { MapContext } from "../context/map/MapContext";
import { Map } from "mapbox-gl";
import PageWrapper from "../components/global/PageWrapper";
import ManagePackages from "../components/ManagePackages";

function Manage() {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current, 
        style: "mapbox://styles/mapbox/light-v10",
        center: userLocation, 
        zoom: 7, 
      });
      setMap(map);
    }
  }, [isLoading, userLocation]);

  return (
    <PageWrapper>
      <div>
        <div
          ref={mapDiv}
          style={{
            height: 450,
          }}>
        </div>
        <ManagePackages/>
      </div>
    </PageWrapper>
  );
}
export default Manage;