// set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// The svg
var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
// Map and projection
//var path = d3.geoPath();
var projection = d3.geoMercator()
    .scale(70)
    .center([0,0])
    .translate([222, 201]);

// Data and color scale
var data = d3.map();

var promises = [];
promises.push(d3.json("map.geojson"));

myDataPromises = Promise.all(promises).then(function(topo) {
	var topo = topo[0]

	// Draw the map
	svg.append("g")
		.selectAll("path")
		
		.data(topo.features)
		.enter()
		.append("path")
		.attr("class", "topo")
		// draw each country
		.attr("d", d3.geoPath()
			.projection(projection)
		)
		// set the color of each country
		.attr("fill", "rgb(255,0,0)")
		.style("opacity", 1)
});