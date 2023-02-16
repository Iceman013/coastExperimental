// Base layer control with radio button function
function makeBaseLayerControl(layer) {
    var base = document.createElement("div");
    base.classList.add("baseLayer");

    var button = document.createElement("input");
    button.value = layer.name;
    button.type = "radio";
    button.name = "baseLayer";
    base.appendChild(button);
    if (layer.showing) {
        button.checked = true;
    }
    button.addEventListener("change", function() {
        for (let i = 0; i < baseLayers.length; i++) {
            if (baseLayers[i].showing) {
                map.removeLayer(baseLayers[i].layer);
                baseLayers[i].showing = false;
                i = baseLayers.length;
            }
        }
        layer.layer.addTo(map);
        layer.showing = true;
        for (let i = 0; i < overLayers.length; i++) {
            if (overLayers[i].showing) {
                map.removeLayer(overLayers[i].layer);
                overLayers[i].layer.addTo(map);
            }
        }
    });

    var title = document.createElement("h3");
    title.innerHTML = layer.name;
    title.classList.add("baseLayerTitle");
    base.appendChild(title);

    return base;
}

// Overlay layer control with checkbox function
function makeOverLayerControl(layer) {
    var base = document.createElement("div");
    base.classList.add("overLayer");

    var button = document.createElement("input");
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

    var title = document.createElement("h3");
    title.innerHTML = layer.name;
    title.classList.add("overLayerTitle");
    base.appendChild(title);

    return base;
}