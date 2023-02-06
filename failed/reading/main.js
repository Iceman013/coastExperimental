// Core function
function main(data) {
    console.time("Total")
    console.time("Neighbor");
    for (let i = 0; i < data.length; i++) {
        var tt = data[i];
        for (let j = 0; j < data.length; j++) {
            if (j != i) {
                var tx = data[j].x;
                var ty = data[j].y;
                var distance = Math.sqrt(Math.pow(tt.x - tx, 2) + Math.pow(tt.y - ty, 2));
                if (data[i].neighbor == null) {
                    tt.neighborX = tx;
                    tt.neighborY = ty;
                    tt.neighbor = distance;
                } else {
                    if (tt.neighbor > distance) {
                        tt.neighborX = tx;
                        tt.neighborY = ty;
                        tt.neighbor = distance;
                    }
                }
            }
        }
    }
    console.log(data);
    console.timeEnd("Neighbor");
    console.time("Triangle");
    console.timeEnd("Triangle");
    console.timeEnd("Total");
}

// Read function
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
// Read from list.json and start main()
readTextFile("list.json", function(text){
    var data = JSON.parse(text);
    main(data);
});