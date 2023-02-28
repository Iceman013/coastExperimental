import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer"
import { useMap } from "react-leaflet/hooks"
import "./css/style.css";
import "./css/legend.css";
import "./css/controls.css";

export default function App() {
	var script = document.createElement("script");
		script.innerHTML = "var mapsPlaceholder = [];L.Map.addInitHook(function () {mapsPlaceholder.push(this);console.log('Uwu');});";
		document.body.appendChild(script)
    useEffect(() => {
        document.body.dispatchEvent(new Event("beginProcess"));
    });
	return (
		<div className="container">
			<div id="controls">
				<h1>Howdy</h1>
				<p>This is very much in progress</p>
				<div id="baseLayers"></div>
				<div id="overLayers"></div>
			</div>
			<div>
				<MapContainer id="map" center={[35, -75]} zoom={5}>
				</MapContainer>
			</div>
			<div id="legend">
				<h3>Legend</h3>
				<div className="scale">
					<p id="minDepth"></p>
					<div id="depth">Hush</div>
					<p id="maxDepth"></p>
				</div>
			</div>
		</div>
	);
}