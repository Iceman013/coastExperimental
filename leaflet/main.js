var map = L.map('map').setView([33.9480, -83.3773], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
/*
var imageUrl = '../Ian_Tampa_Test_250.jpg',
    imageBounds = [[33.9480, -83.3773], [40.773941, -74.12544]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
*/

// Create map
var layer = L.leafletGeotiff("../Ian_Tampa_Test_250.tif", null).addTo(map);