var map = L.map('map', {
    center: [0.099242, 34.051121],
    zoom: 13,
});  

var myLocation;
var isGeolocationActive;
var isgeolocateByMapClick = false;
var geolocateModal = $('#geolocate-prompt');
var confirmUserLocationButton = $('#confirm-location');
var dismissUserLocationButton = $('#dismiss-location');
var spinner = $("#spinner");

// nearest feature
var nearestCamp = $('#nearest-camp');

// affectes area
var affectedFeaturesButton = $("#affected-feature");
var affectedAreaModal = $("#affected-areas-prompt");
var affectedFeatureForm = $("#affected-areas-form");

var affectedPopulation = $("#affected-population");

// add a tile Layer
var cartoLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
    attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
    minZoom: 0
}).addTo(map);


var baseLayer = {
    "Carto Light":cartoLight
};

map.on('click', function(e) {
    console.log(e);
    if(isgeolocateByMapClick) {
         // prompt the user to set as their location
        geolocateModal.modal('show');
        myLocation = e.latlng;
    }
   
});

// Geolocation control
var geolocationControl = new L.Control({position:'topleft'});
geolocationControl.onAdd = function(map) {
    let div = L.DomUtil.create('button', 'btn-geo btn-circle btn-sm');
    div.innerHTML = '<i class="fa fa-location-arrow"></i>'

    div.addEventListener('click', function(e) {
        triggerGeolocation();
    });

    return div;
}

geolocationControl.addTo(map);

function triggerGeolocation() {
    if(isGeolocationActive) {
        map.stopLocate();
        isGeolocationActive = false;

        // update the geolocation Icon
    } else {
        map.locate({
            watch:true,
            setView:true,
            enableHighAccuracy:true
        });
    }
}

map.on("locationfound", function(e) {
    // update myLocation
    myLocation = e.latlng;
});

map.on("locationerror" , function(e) {
    isgeolocateByMapClick = true;
    alert("Click your Location on the Map");
});

// geolocation
confirmUserLocationButton.on("click", function(e) {
    geolocateModal.modal('hide');
    isgeolocateByMapClick = false;
});


dismissUserLocationButton.on("click", function(e) {
    myLocation = null;
    geolocateModal.modal('hide');
});


// nearest camp
nearestCamp.on('click', function(e) {
    if(myLocation) {
        let point = turf.point(Object.values(myLocation).reverse());

        findCamp(point, hospitals);
    } else {
        alert("Kindly geolocate or click on the map and try again");
        isgeolocateByMapClick = true;
    }
}); 

// affected population
affectedPopulation.on('click', function(e) {
    // get the constituecy affected
    spinner.removeClass("d-none");
    let constituen = constituency.toGeoJSON();

    let basin = riverBasin.toGeoJSON();
    basin = basin.features[0];

    constituen.features = constituen.features.filter(feature => {
        if(turf.booleanOverlap(basin, feature)) {
            return feature;
        }
    });

    console.log(constituen);

    // Count the 
    let count = constituen.features.map( feature =>  parseInt(feature.properties.households.replace(',', '')));
    console.log(count);

    count = count.reduce((a, b) => a + b);
    console.log(count);

    let affectedFeaturesString = count + " households have been affected by floods in " + constituen.features.length + " Constituecies";
    $("#feature-description").text(affectedFeaturesString);

    affectedConstituecy.clearLayers();
    affectedConstituecy.addData(constituen);

    spinner.addClass("d-none");
});

// Affected areas: Algo
affectedFeaturesButton.on("click", function(e) {
    affectedAreaModal.modal('show');
});


affectedFeatureForm.on("submit", function(e) {
    e.preventDefault();

    // get the value
    let value = affectedFeatureForm.serializeArray()[0].value;
    console.log(value);

    // hide the modal
    affectedAreaModal.modal('hide');

    // get the the respective feature
    let feature = overlays[value];
    console.log(feature);
    findAffectedInfrastucture(feature, value); 
    closestCamp.clearLayers();
});

// map reset Control
var ResetControl = new L.Control({position:'bottomleft'});
ResetControl.onAdd = function(map) {
    let div = L.DomUtil.create('button', 'btn');
    div.setAttribute('id', 'reset-button');
    div.innerHTML = "Reset";

    div.addEventListener('click', function(e) {
        // clear map Layers
        closestCamp.clearLayers();
        affectedFeatures.clearLayers();
    });

    return div;
}

ResetControl.addTo(map);

// User Location Modal
var userLocationModal = $("#user-location-modal");
var toggleUserLocationButton =  $("#report-my-location");
var userLocationFormElement = document.querySelector("#user-location-form");
var userLocationForm = $("#user-location-form");

toggleUserLocationButton.on('click', function(e) {
    // check if myLocation id defined
    if(myLocation) {
        userLocationModal.modal('show');
    } else {
        alert('Provide user location');
    }
});

userLocationForm.on("submit", function(e) {
    e.preventDefault();
    let userLocationData = new FormData(userLocationFormElement);

    
    userLocationData.append('geom', Object.values(myLocation).reverse().join(" "));

    // add the geom
    fetch('/add_user_location/', {
        method:'POST',
        body:userLocationData
    })
    .then(response => response.json())
    .then(({message}) => {
        console.log(message);
        if(message == 'success') {
            userLocationModal.modal('hide');
            userLocationFormElement.reset();

            // update snackbar message
           snackbar.addClass('open');
           snackbar.text("Successfully reported your location")
        } else {
            $('error-message').text("");
        }
    })
    .catch(error => {
        console.error(error);
    });
});

$('#dismiss-location').on('click', function(e) {
    userLocationFormElement.reset();
});