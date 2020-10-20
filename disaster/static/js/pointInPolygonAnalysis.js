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
   spinner.removeClass("d-none");
   findAffectedFeatures(features)
    .then(response => response)
    .then(data => {
        console.log(data);

        affectedFeatures.clearLayers();
        affectedFeatures.addData(data);
        
        if(data.features.length > 1) {
            map.fitBounds(affectedFeatures.getBounds());
        }

        let affectedFeaturesString = data.features.length + " " + featureType + " affected by floods"
        $("#feature-description").text(affectedFeaturesString);

        setTimeout(function(e){
            spinner.addClass("d-none");
        }, 100);
        
    })
    .catch(error => {
        console.error(error);

        setTimeout(function(e){
            spinner.addClass("d-none");
        }, 100);
    });
}