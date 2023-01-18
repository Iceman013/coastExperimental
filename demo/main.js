var map = L.map('map', {crs: L.CRS.EPSG4326}).setView([33.9480, -83.3773], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var url_to_geotiff_file = "../Ian_Tampa_Test_250.tif";

fetch(url_to_geotiff_file)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    parse_georaster(arrayBuffer).then(georaster => {
      console.log("georaster:", georaster);

      /*
          GeoRasterLayer is an extension of GridLayer,
          which means can use GridLayer options like opacity.

          Just make sure to include the georaster option!

          http://leafletjs.com/reference-1.2.0.html#gridlayer
      */
      var layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.7,
          pixelValuesToColorFn: values => values[0] > 100 ? '#ff0000' : '#0000ff',
          resolution: 64 // optional parameter for adjusting display resolution
      });
      layer.addTo(map);

      map.fitBounds(layer.getBounds());

  });
});
/*
var imageUrl = '../Ian_Tampa_Test_250.jpg',
    imageBounds = [[33.9480, -83.3773], [40.773941, -74.12544]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
*/