// Global Variables
var map;
var baseLayers = [];
var overLayers = [];

// Makes the leaflet map
function drawMap() {
    map = L.map('map', {
        center: [35, -75],
        zoom: 5
    });
}

// Creates the default base layers (street map, satellite map, etc)
function addBaseLayers() {
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    baseLayers.push(new Layer("Streets", "base", googleStreets));
    baseLayers.push(new Layer("Hybrid", "base", googleHybrid));
    baseLayers.push(new Layer("Satellite", "base", googleSat));
    baseLayers.push(new Layer("Terrain", "base", googleTerrain));
    
    googleHybrid.addTo(map);
    baseLayers[1].showing = true;
}

// Adds a geotiff object as a layer
function addTifLayers() {
    var promiseList = [];
    for (let i = 0; i < tiffList.length; i++) {
        var url_to_geotiff_file = tiffList[i].url;

        promiseList.push(parseGeoraster(url_to_geotiff_file).then(georaster => {
            console.log("georaster:", georaster);

            //    GeoRasterLayer is an extension of GridLayer,
            //    which means can use GridLayer options like opacity.
            //    Just make sure to include the georaster option!
            //    http://leafletjs.com/reference-1.2.0.html#gridlayer

            function colorScale(value) {
                var r = 0;
                var g = 0;
                var b = 0;
                if (value < 0.5) {
                    b = 1 - 2*value;
                    g = 2 * value;
                } else {
                    g = 1 - 2*(value - 0.5);
                    r = 2*(value - 0.5);
                }
                return "rgb(" + 256*r + "," + 256*g + "," + 256*b + ")";
            }
            function doColors(input) {
                const showup = 1;
                if (input < showup) {
                    var adjusted = input - showup;
                    var scale = 0;
                    scale = 1 - (1/(Math.abs(adjusted) + 1));
                    return colorScale(scale);
                }
            }

            var tifLayer = new GeoRasterLayer({
                attribution: "Planet",
                georaster: georaster,
                resolution: 64,
                opacity: 0.75,
                pixelValuesToColorFn: values => doColors(values[0])
            });

            //tifLayer.addTo(map);
            overLayers.push(new Layer(tiffList[i].name, "overlay", tifLayer));
            //map.fitBounds(layer.getBounds());
        }));
    }
    return promiseList;
}

// Creates the control panel for layer display
function makeControl() {
    for (let i = 0; i < baseLayers.length; i++) {
        var base = document.getElementById("baseLayers");
        var element = makeBaseLayerControl(baseLayers[i]);
        base.appendChild(element);
    }
    for (let i = 0; i < overLayers.length; i++) {
        var base = document.getElementById("overLayers");
        var element = makeOverLayerControl(overLayers[i]);
        base.appendChild(element);
    }
}

// Draws all elements
function drawLayers() {
    drawMap();
    addBaseLayers();
    Promise.all(addTifLayers()).then(makeControl);
}
drawLayers();