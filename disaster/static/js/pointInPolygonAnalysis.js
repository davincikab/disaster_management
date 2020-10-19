// find Nearest camp
function findAffectedFeatures(features) {
    let points = features.toGeoJSON();

    let searchWithin = floodedAreas.toGeoJSON();
    console.log(searchWithin);

    return new Promise((resolve, reject) => {
        resolve(turf.pointsWithinPolygon(points, searchWithin));
    });
}

function findAffectedInfrastucture(features, featureType) {
   findAffectedFeatures(features)
    .then(response => response)
    .then(data => {
        console.log(data);

        affectedFeatures.clearLayers();
        affectedFeatures.addData(data);

        let affectedFeaturesString = data.features.length + " " + featureType + " affected by floods"
        $("#feature-description").text(affectedFeaturesString);
    })
    .catch(error => {
        console.error(error);
    });
}