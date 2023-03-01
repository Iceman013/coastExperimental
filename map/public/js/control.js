// Overlay layer control with checkbox function
function makeOverLayerControl(layer) {
    // Base
    var base = document.createElement("div");
    base.classList.add("overLayer");

    // The checkbox
    var button = document.createElement("input");
    button.id = layer.name;
    button.value = layer.name;
    button.type = "checkbox";
    base.appendChild(button);
    button.addEventListener("change", function() {
        if (layer.showing) {
            map.removeLayer(layer.layer);
        } else {
            layer.layer.addTo(map);
        }
        layer.showing = !layer.showing;
    });

    // Label
    var title = document.createElement("label");
    title.for = layer.name;
    title.classList.add("overLayerTitle");
    base.appendChild(title);

    // Name
    var name = document.createElement("text");
    name.innerHTML = layer.name;
    title.appendChild(name);

    // Zoom in button
    var boop = document.createElement("span");
    boop.classList.add("material-symbols-outlined");
    boop.classList.add("controlButton");
    boop.innerHTML = "zoom_in";
    title.appendChild(boop);
    boop.addEventListener("click", function() {
        if (layer.showing) {
            var bounds = layer.layer.getBounds();
            var boundSet = [
                [bounds._northEast.lat, bounds._northEast.lng],
                [bounds._southWest.lat, bounds._southWest.lng]
            ]
            map.fitBounds(boundSet);
        }
    });

    return base;
}