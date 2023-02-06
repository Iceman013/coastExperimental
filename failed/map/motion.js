const MAGNIFICATION = 1.2;
var magnify = 1;
var currentx = 0;
var currenty = 0;
const PAINFIX = 0.168;

function zoom(direction, x, y) {
	if (LOG) {
        console.time("Zoom");
    }
    if (direction > 0) {
        currentx = currentx + PAINFIX*x/magnify;
        currenty = currenty + PAINFIX*y/magnify;
        magnify = magnify/MAGNIFICATION;
    } else {
        currentx = currentx - PAINFIX*x/magnify;
        currenty = currenty - PAINFIX*y/magnify;
        magnify = magnify*MAGNIFICATION;
    }
	svg.selectAll("g")
		.attr("transform", "scale(" + magnify + "), translate(" + currentx + "," + currenty + ")")
        .selectAll("path")
            .style("stroke-width", (1/magnify)*0.5 + "px")
    if (LOG) {
        console.timeEnd("Zoom");
    }
}

var moving = false;
var holdx = 0;
var holdy = 0;

function move(x, y) {
    if (LOG) {
        console.time("Move");
    }
    currentx = currentx + (x - holdx)/magnify;
    currenty = currenty + (y - holdy)/magnify;
    svg.selectAll("g")
		.attr("transform", "scale(" + magnify + "), translate(" + currentx + "," + currenty + ")")
    if (LOG) {
        console.timeEnd("Move");
    }
}

document.getElementById("map").addEventListener("wheel", function(event) {
    zoom(event.deltaY, event.offsetX, event.offsetY);
});


document.getElementById("map").addEventListener("mousedown", function(event) {
    moving = true;
    holdx = event.offsetX;
    holdy = event.offsetY;
});
document.getElementById("map").addEventListener("mouseleave", function() {
    moving = false;
});
document.getElementById("map").addEventListener("mouseup", function() {
    moving = false;
});
document.getElementById("map").addEventListener("mousemove", function(event) {
    if (moving) {
        if (holdx != event.offsetX && holdy != event.offsetY) {
            move(event.offsetX, event.offsetY);
            holdx = event.offsetX;
            holdy = event.offsetY;
        }
    }
});