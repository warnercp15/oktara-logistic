import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1IjoiY2FybG9zMzg5NyIsImEiOiJja25zMWs1YjgwMjhxMnB0aHBud3pkeG5qIn0.JhmYR1NECWhcO7KCEdpnkA",
  },
});

export default searchApi;