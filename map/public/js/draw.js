// Global Variables
var map;
var baseLayers = [];
var overLayers = [];

// Makes the leaflet map
function drawMap() {
    map = mapsPlaceholder[0];
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
                } else if (value < 1) {
                    g = 1 - 2*(value - 0.5);
                    r = 2*(value - 0.5);
                } else {
                    r = 1;
                }
                function flhex(input) {
                    return Math.floor(256*input);
                }
                return "rgb(" + flhex(r) + "," + flhex(g) + "," + flhex(b) + ")";
            }
            function doColors(input) {
                var eval;
                if (MIN < MAX) {
                    eval = (input > MIN);
                } else {
                    eval = (input < MIN);
                }
                if (eval) {
                    var scale = (input - MIN)/(MAX - MIN);
                    return colorScale(scale);
                }
            }

            var tifLayer = new GeoRasterLayer({
                attribution: "Planet",
                georaster: georaster,
                resolution: RESOLUTION,
                opacity: 0.75,
                pixelValuesToColorFn: values => doColors(values[0])
            });

            overLayers.push(new Layer(tiffList[i].name, "overlay", tifLayer));
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