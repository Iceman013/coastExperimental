function drawEdge(edge) {
    var svg = document.getElementsByTagName("svg")[0];

    function scale(set) {
        for (let i = 0; i < set.length; i++) {
            set[i][0] = svg.clientWidth*path[i][0];
            set[i][1] = svg.clientHeight*path[i][1];
        }
        return set;
    }
    var area;
	if (true) {
		var path = [[edge.nodea.x, edge.nodea.y], [edge.nodeb.x, edge.nodeb.y]];
		areaGenerator = d3.line();
		area = areaGenerator(scale(path));
	}
    
	d3.select("g")
		.append("path")
		.attr("d", area);
}
function makeNodes(size) {
    var out = [];
    for (let i = 0; i < size; i++) {
        out.push(new Node(Math.random(), Math.random()));
    }
    return out;
}
function start() {
    var nodes = makeNodes(20);
    var edges = makeEdges(nodes);
    for (let i = 0; i < edges.length; i++) {
        drawEdge(edges[i]);
    }
}
start();