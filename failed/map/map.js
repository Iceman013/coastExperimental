// set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 650 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// The svg
var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
// Map and projection
var scale = 16;
var home = { "x": -83.37153001980379, "y": 33.94412194110523 };
var projections = [d3.geoMercator, d3.geoEquirectangular];
var projection = projections[0]()
	.scale(scale*100)
	.center([home.x, home.y])
	.translate([width/2, height/2]);


// Data and color scale
var data = d3.map();

var maplist = [
	{
		"src": "maps/americas.geojson",
		"class": "land"
	},
	{
		"src": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_lakes_north_america.geojson",
		"class": "water"
	}
];
var promises = [];
for (let i = 0; i < maplist.length; i++) {
	promises.push(d3.json(maplist[i].src));
}

function makeMap() {
	if (LOG) {
		console.time("Making Map");
	}
	for (let i = 0; i < maplist.length; i++) {
		myDataPromises = Promise.all(promises).then(function(topo) {
			var topo = topo[i];

			// Draw the map
			svg.append("g")
				.attr("class", function() { return maplist[i].class; })
				.selectAll("path")
				
				.data(topo.features)
				.enter()
				.append("path")
				.attr("class", "topo")
				// draw each country
				.attr("d", d3.geoPath()
					.projection(projection)
				)
		});
	}
	if (LOG) {
		console.timeEnd("Making Map");
	}
}
makeMap();