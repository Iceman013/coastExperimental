var map = L.map('map').setView([33.9480, -83.3773], 13);
var GeoTIFF = 0;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
/*
var imageUrl = '../Ian_Tampa_Test_250.jpg',
    imageBounds = [[33.9480, -83.3773], [40.773941, -74.12544]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
*/

// Create map
var windSpeed = L.leafletGeotiff(
    url='../Ian_Tampa_Test_250.tif',
    options={band: 0,
        displayMin: 0,
        displayMax: 30,
        name: 'Wind speed',
        colorScale: 'rainbow',
        clampLow: false,
        clampHigh: true,
        //vector:true,
        arrowSize: 20,
    }
).addTo(map);
//var layer = L.leafletGeotiff("../Ian_Tampa_Test_250.tif", {renderer: L.LeafletGeotiff.plotty()}).addTo(map);