// find Nearest camp
function findNearestCamp(point, geoObj) {
    let camps = geoObj.toGeoJSON();

    console.log(camps);
    let fc = turf.featureCollection(camps.features);
    console.log(fc);

    // Camp should not be in the flood zone
    

    return new Promise((resolve, reject) => {
        resolve(turf.nearestPoint(point, fc))
    });
}

function findCamp(point) {
    spinner.removeClass("d-none");
    findNearestCamp(point, camps)
    .then(response => response)
    .then(data => {
        console.log(data);
        // calculate distance
        let distance = turf.distance(point, data);

        data.properties.distance = distance.toFixed(3);
        
        let fc = turf.featureCollection([point, data]);
        closestCamp.addData(fc);

        // fit bounds
        if(fc.features.length > 1) {
            map.fitBounds(closestCamp.getBounds());
        }

        // toggle popup
        closestCamp.eachLayer(layer => layer.togglePopup());

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