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

// add a tile Layer
var cartoLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
    attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
    minZoom: 0
}).addTo(map);


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
    myLocation = e;
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


