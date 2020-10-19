// data panes
var pointDataPane = map.createPane("points");
var lineDataPane = map.createPane("lines");
var polygonDataPane = map.createPane("polygons");

// ===================== TILED DATA ===============================================
// constituency
// road section

// ===================== LINE DATA ===============================================
var riverNzoia = L.geoJSON(null, {
    style:function(feature) {
        return {
            color:"#138496",
            weight:3
        };
    },
    pane:"lines"
});

riverNzoia.addTo(map);

// River data
fetch('/line_data')
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
    riverNzoia.addData(data);
})
.catch(error => {
    console.log(error);
});

// ===================== POLYGON DATA ===============================================
// basin
var riverBasin = L.geoJSON(null, {
    style:function(feature) {
        return {
            fillColor:"#ff0000",
            weight:0
        }
    }
});

riverBasin.addTo(map);

// lake
var lakeVictoria = L.geoJSON(null, {
    style:function(feature) {
        return {
            weight:0
        }
    }
});

lakeVictoria.addTo(map);

// load the data from db
fetch("/polygon_data")
.then(response => {
    return response.json();
})
.then(polygonData => {
    console.log(polygonData);
    let {basin, lake} = polygonData;

    riverBasin.addData(JSON.parse(basin));
    lakeVictoria.addData(JSON.parse(lake));
})
.catch(error => {
    console.log(error);
});


// ===================== POINT DATA ===============================================

// Hospitals
var hospitalIcon = L.icon({
    iconUrl:'/static/images/hospital.png',
    iconSize:[25, 25]
});

var hospitals = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:hospitalIcon
        });
    }
});

hospitals.addTo(map);

// Schools
var primarySchoolIcon = L.divIcon({
    className:"primary-school"
});

var primarySchools = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:primarySchoolIcon
        });
    }
});

primarySchools.addTo(map);

var secondarySchoolIcon = L.divIcon({
    className:'secondary-school'
});

var secondarySchools = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:secondarySchoolIcon
        });
    }
});

secondarySchools.addTo(map);

// Irrigation Schemes
var irrigationSchemeIcon = L.divIcon({
    className:"irrigation"
});

var irrigationSchemes = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:irrigationSchemeIcon
        });
    }
});

irrigationSchemes.addTo(map);

// Villages
var villageIcon = L.divIcon({
    className:"village"
});

var villages = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:villageIcon
        });
    }
});

villages.addTo(map);

// trading centres
var tradingCentreIcon = L.divIcon({
    className:"trading-center"
});

var tradingCentres = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:tradingCentreIcon
        });
    }
});

tradingCentres.addTo(map);

// waterpoints
var waterPointIcon = L.divIcon({
    className:"water-point"
});

var waterPoints = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:waterPointIcon
        });
    }
});

waterPoints.addTo(map);

// settlement schemes
var settlementSchemeIcon = L.divIcon({
    className:"settlement-scheme"
});

var settlementSchemes = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:settlementSchemeIcon
        });
    }
});

settlementSchemes.addTo(map);

// Point Data
fetch('/point_data')
.then(response => {
    return response.json();
})
.then(pointData => {
    // console.log(pointData);
    let {hospital, primary, secondary, irrigation, 
        village, trading, waterPoint, settlement} = pointData;

    // update the layers
    hospitals.addData(JSON.parse(hospital));
    primarySchools.addData(JSON.parse(primary));
    secondarySchools.addData(JSON.parse(secondary));
    irrigationSchemes.addData(JSON.parse(irrigation));
    villages.addData(JSON.parse(village));
    tradingCentres.addData(JSON.parse(trading));
    waterPoints.addData(JSON.parse(waterPoint));
    settlementSchemes.addData(JSON.parse(settlement));

})
.catch(error => {
    console.log(error);
});


// layer groups

// closest Feature Object
let myLocationIcon = L.icon({
    iconUrl:'/static/images/start.png',
    iconSize:[30, 70],
    popupAnchor:[-3, -30]
});

let destinationIcon = L.icon({
    iconUrl:'/static/images/stop.png',
    iconSize:[30, 70],
    popupAnchor:[-3, -30]    
});

var closestCamp = L.geoJSON(null, {
    style:{

    },
    onEachFeature:function(feature, layer) {
        if(feature.properties.distance) {
            layer.bindPopup("<h6><strong>" + feature.properties.f_name + "</strong></h6><p class='popup-item'><strong>Distance</strong>"+feature.properties.distance +" Km</p>");
        } else {
            layer.bindPopup("<p class='popup-item'><strong>My Location</strong></p>");
        }
        
    },
    pointToLayer:function(geoObj, latLng) {
        console.log(geoObj);
        if(geoObj.properties.distance) {
            return L.marker(latLng, {icon:destinationIcon});
        }

        return L.marker(latLng, {icon:myLocationIcon});
    }
});

closestCamp.addTo(map);