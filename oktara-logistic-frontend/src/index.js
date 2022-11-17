/* eslint import/no-webpack-loader-syntax: off */
import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "!mapbox-gl";
import App from "./App";
import './styles/globals.scss';

mapboxgl.accessToken = "pk.eyJ1IjoiY2FybG9zMzg5NyIsImEiOiJjbGEwZW9idWcwNHJ1M3dxZ2doYm10dmJpIn0.Wygg1LWkef9akBZdNzleBA";

if (!navigator.geolocation) {
  alert("The application will not work without Geolocation");
  throw new Error("You have to allow Geolocation");
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);