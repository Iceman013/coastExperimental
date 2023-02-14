// Global Variables
var map;
var layers = [];
var tiffsAdded = 0;

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

    layers.push(new Layer("Streets", "base", googleStreets));
    layers.push(new Layer("Hybrid", "base", googleHybrid));
    layers.push(new Layer("Satellite", "base", googleSat));
    layers.push(new Layer("Terrain", "base", googleTerrain));
    
    googleHybrid.addTo(map);
}

// Adds a geotiff object as a layer
function addTifLayer(name, input) {
    var url_to_geotiff_file = input;

    parseGeoraster(url_to_geotiff_file).then(georaster => {
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
            const showup = 0;
            if (input < showup) {
                var adjusted = input - showup;
                var scale = 0;
                scale = 1 - (1/(Math.abs(adjusted) + 1));
                return colorScale(scale);
            }
        }
        //values[0] < 0 ? null : `rgb(${100*values[0]},${values[0]},${values[0]})`
        var tifLayer = new GeoRasterLayer({
            attribution: "Planet",
            georaster: georaster,
            resolution: 64,
            opacity: 0.75,
            pixelValuesToColorFn: values => doColors(values[0])
        });
        //tifLayer.addTo(map);
        layers.push(new Layer(name, "overlay", tifLayer));
        tiffsAdded++;
        //map.fitBounds(layer.getBounds());
    });
}

// Creates the control panel for layer display
function makeControl() {
    var layerControl = L.control.layers().addTo(map);
    for (let i = 0; i < layers.length; i++) {
        if (layers[i].type == "base") {
            layerControl.addBaseLayer(layers[i].layer, layers[i].name);
        }
        if (layers[i].type == "overlay") {
            layerControl.addOverlay(layers[i].layer, layers[i].name);
        }
    }
}

// Draws all elements
function drawLayers() {
    drawMap();
    addBaseLayers();
    for (let i = 0; i < tiffList.length; i++) {
        addTifLayer(tiffList[i].name, tiffList[i].url);
    }

    // Checks to make sure all tifs have been made before adding controls
    var checkTifs = setInterval(function() {
        if (tiffsAdded == tiffList.length) {
            clearInterval(checkTifs);
            makeControl();
        }
    }, 100);
}
drawLayers();