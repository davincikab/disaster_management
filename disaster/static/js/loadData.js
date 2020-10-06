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
    }
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
var basin = L.geoJSON(null, {
    style:function(feature) {
        return {

        }
    }
});

basin.addTo(map);

// lake
var lakeVictoria = L.geoJSON(null, {
    style:function(feature) {
        return {

        }
    }
});

lakeVictoria.addTo(map);

// load the data from db
fetch("/polygon_data")
.then(response => {

})
.then(polygonData => {
    let [basin, lake] = JSON.parse(polygonData);
    basin.addData(data);
    lakeVictoria.addData(lake);
})
.catch(error => {
    console.log(data);
});


// ===================== POINT DATA ===============================================

// Hospitals
var hospitalIcon = L.Icon({
    iconUrl:'',
    iconSize:''
});

var hospitals = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {

        });
    }
});

hospitals.addTo(map);

// Schools
var primarySchoolIcon = L.Icon({
    iconUrl:'',
    iconSize:''
});

var primarySchools = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {

        });
    }
});

primarySchools.addTo(map);

var secondarySchoolIcon = L.Icon({
    iconUrl:'',
    iconSize:''
});

var secondarySchools = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {

        });
    }
});

secondarySchools.addTo(map);

// Irrigation Schemes
var irrigationSchemeIcon = L.Icon({
    iconUrl:'',
    iconSize:''
});

var irrigationSchemes = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {

        });
    }
});

irrigationSchemes.addTo(map);

// Villages
var villageIcon = L.Icon({
    iconUrl:'',
    iconSize:''
});

var villages = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {

        });
    }
});

villages.addTo(map);

// trading centres
var tradingCentreIcon = L.Icon({
    iconUrl:'',
    iconSize:''
});

var tradingCentres = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {

        });
    }
});

tradingCentres.addTo(map);

// waterpoints
var waterPointIcon = L.Icon({
    iconUrl:'',
    iconSize:''
});

var waterPoints = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {

        });
    }
});

waterPoints.addTo(map);

// settlement schemes
var settlementSchemeIcon = L.Icon({
    iconUrl:'',
    iconSize:''
});

var settlementSchemes = L.geoJSON(null, {
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {

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
    console.log(pointData);
    let [hospital, primary, secondary, irrigation, 
        village, trading, waterPoint, settlement] = JSON.parse(pointData);

    // update the layers
    hospitals.addData(hospital);
    primarySchools.addData(primary);
    secondarySchools.addData(secondary);
    irrigationSchemes.addData(irrigation);
    villages.addData(village);
    trading.addData(trading);
    waterPoints.addData(waterPoint);
    settlement.addData(settlement);

})
.catch(error => {
    console.log(error);
});


