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

        removeAllOverlay();
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

function getAffectedArea(feature) {
    // display the spinner
    spinner.removeClass("d-none");

    //fetch the data
    fetch("/static/data/affected_cropland.geojson")
    .then(res => res.json())
    .then(response => {
        console.log("Affected Crop Land");
        console.log(response);

        // calculate the area
        let area = turf.area(response);

        // update the text
        area = area / 1000;
        let affectedFeaturesString = Math.floor(area) + " km2 of Cropland affected by floods";
        $("#feature-description").text(affectedFeaturesString);

        // hide spinner
        setTimeout(function(e){
            spinner.addClass("d-none");
        }, 100);

        // update the map with cropLand
        removeAllOverlay();
        affectedCropLand.addData(response).addTo(map);

    })
    .catch(error =>{
        console.error(error);
    });
}

function getAffectedHouseHolds() {
    // display the spinner
    spinner.removeClass("d-none");

    // send request to the back 
    fetch("/static/data/affected_households.geojson")
    .then(res => res.json())
    .then(response => {
        console.log(response);

        // creat and array of latlng
        let pnts = response.features.map(feature => {
            let coord = feature.geometry.coordinates;

            return [coord[1], coord[0]]
        });

        console.log(pnts);

        // update affected households
        removeAllOverlay();
        affectedHouseHolds.setLatLngs(pnts).addTo(map);

        // stats
        let people = Math.floor(pnts.length * 4.5);
        let youth = Math.floor(people * 0.33);

        let affectedFeaturesString = people + " people affected by floods." + youth + " individuals are 18 years and below";

        $("#feature-description").text(affectedFeaturesString);

        // hide spinner
        setTimeout(function(e){
            spinner.addClass("d-none");
        }, 100);

    })
    .catch(error =>{
        console.error(error);
    })
}