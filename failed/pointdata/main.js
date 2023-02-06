async function doStuff() {
    const file = await geoTIFF.fromFile("../Ian_Tampa_Test_250.tif");
    const image = await file.getImage();
}
doStuff();