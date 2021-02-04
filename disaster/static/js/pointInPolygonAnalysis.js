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

        let newFeatures = features.toGeoJSON();
        let percentageAffected = (data.features.length * 100 / newFeatures.features.length).toFixed(1);

        let affectedFeaturesString = "<p>" + data.features.length + " ("+ percentageAffected +"%) " + featureType + " were affected by floods</p>";
        $("#feature-description").html(affectedFeaturesString);


        // create the div
        updateDescriptionSection(percentageAffected);


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

function updateDescriptionSection(percentageAffected) {
    let div = document.createElement('div');
    div.classList.add("py-2");
    div.style.border = "1px solid gray";
    div.style.backgroundImage = "linear-gradient(90deg, #A23E22 0% "+ percentageAffected +"%, #fff "+ percentageAffected +"%)";

    $("#feature-description").append(div);
    $("#feature-description").append("<p class='text-center'>"+ percentageAffected + "%</p>");
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
        let percentageAffected = Math.floor(turf.area(response) * 100 / turf.area(cropLand.toGeoJSON()));

        let affectedFeaturesString = Math.floor(area) + " km2 ("+ percentageAffected +"%) of Cropland affected by floods";
        $("#feature-description").text(affectedFeaturesString);

        // update description sections
        updateDescriptionSection(percentageAffected);

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
        let percentageAffected = (pnts.length * 100 / 246995).toFixed(1);
        let people = Math.floor(pnts.length * 4.5);
        let youth = Math.floor(people * 0.33);
        let percentageYouth = Math.floor(youth * 100 / people).toFixed(1);

        let affectedFeaturesString = "<p>"+ people + " (" + percentageAffected + "%) of the people were affected by floods.<br>" + youth + " (" + percentageYouth + "%) of affected individuals are 18 years and below</br>";

        $("#feature-description").append(affectedFeaturesString);

         // update description sections
         
         updateDescriptionSection(percentageAffected);

        // hide spinner
        setTimeout(function(e){
            spinner.addClass("d-none");
        }, 100);

    })
    .catch(error =>{
        console.error(error);
    })
}