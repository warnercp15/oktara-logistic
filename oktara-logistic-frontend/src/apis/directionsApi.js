import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    access_token:
      "pk.eyJ1IjoiY2FybG9zMzg5NyIsImEiOiJja25zMWs1YjgwMjhxMnB0aHBud3pkeG5qIn0.JhmYR1NECWhcO7KCEdpnkA",
  },
});

export default directionsApi;