// initalize leaflet map
var map = L.map('map').setView([0, 0], 5);

// add OpenStreetMap basemap
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var url_to_geotiff_file = "https://uga-coast.s3.us-east-2.amazonaws.com/test/ian_cog.tif";

parseGeoraster(url_to_geotiff_file).then(georaster => {
  console.log("georaster:", georaster);

  /*
      GeoRasterLayer is an extension of GridLayer,
      which means can use GridLayer options like opacity.
      Just make sure to include the georaster option!
      http://leafletjs.com/reference-1.2.0.html#gridlayer
  */
  var layer = new GeoRasterLayer({
      attribution: "Planet",
      georaster: georaster,
      resolution: 128,
      opacity: 0.75
  });
  layer.addTo(map);

  map.fitBounds(layer.getBounds());

});
