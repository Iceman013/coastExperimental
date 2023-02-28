import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer"
import { useMap } from "react-leaflet/hooks"
import "./css/style.css";
import "./css/legend.css";
import "./css/controls.css";

export default function App() {
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
			<div id="map">
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