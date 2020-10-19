// find Nearest camp
function findNearestCamp(point, geoObj) {
    let camps = geoObj.toGeoJSON();

    console.log(camps);
    let fc = turf.featureCollection(camps.features);
    console.log(fc);

    return new Promise((resolve, reject) => {
        resolve(turf.nearestPoint(point, fc))
    });
}

function findCamp(point) {
    findNearestCamp(point, hospitals)
    .then(response => response)
    .then(data => {
        console.log(data);
        // calculate distance
        let distance = turf.distance(point, data);

        data.properties.distance = distance.toFixed(3);
        closestCamp.addData(turf.featureCollection([data, point]));

        // toggle popup
        closestCamp.eachLayer(layer => layer.togglePopup());
    })
    .catch(error => {
        console.error(error);
    });
}