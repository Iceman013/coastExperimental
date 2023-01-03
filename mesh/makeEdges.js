function allEdges(nodes) {
    var edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = 1; j < nodes.length; j++) {
            edges.push(new Edge(nodes[i], nodes[j]));
        }
    }
    return edges;
}
function makeWire(nodes) {
    var edges = [];
    var used = [nodes[0]];
    while (used.length < nodes.length) {
        var shorta;
        var shortb;
        for (let i = 0; i < used.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                if (!used.includes(nodes[j])) {
                    if (shorta == null || shortb == null) {
                        shorta = used[i];
                        shortb = nodes[j];
                    } else if (shorta.getDistance(shortb) > nodes[i].getDistance(nodes[j])) {
                        shorta = used[i];
                        shortb = nodes[j];
                    }
                }
            }
        }
        if (!used.includes(shortb)) {
            edges.push(new Edge(shorta, shortb));
            used.push(shortb);
        }
    }
    return edges;
}
function makeEdges(nodes) {
    return makeWire(nodes);
}