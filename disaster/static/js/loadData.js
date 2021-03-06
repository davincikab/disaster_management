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
// constituency
var constituency = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.constituen, feature, layer);   
    },
    style:function(feature) {
        return {
            fillColor:"#ff0000",
            weight:0
        }
    }
});

// constituency.addTo(map);

var affectedConstituecy = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.constituen, feature, layer);   
    },
    style:function(feature) {
        return {
            fillColor:"#00ff00",
            weight:0
        }
    }
});

// affectedConstituecy.addTo(map);

// cropland
var cropLand = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        // createPopup(feature.properties.name, feature, layer);
    },
    style:function(feature) {
        return {
            fillColor:"#1cba10",
            weight:0
        }
    }
})
// .addTo(map);

var affectedCropLand = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        // createPopup(feature.properties.name, feature, layer);
    },
    style:function(feature) {
        return {
            fillColor:"#1cba10",
            weight:0
        }
    }
});

// heatmapLayer
var affectedHouseHolds = L.heatLayer([]);

// basin
var riverBasin = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        // createPopup(feature.properties.name, feature, layer);
    },
    style:function(feature) {
        return {
            fillColor:"#ff0000",
            weight:0
        }
    }
});

// riverBasin.addTo(map);

var floodedAreas = L.geoJSON(null, {
   style:function(e) {
       return {
           fillColor:"#1ce6ed",
           weight:0
       }
   } 
});

floodedAreas.addTo(map);

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
    let {basin, lake, cropland} = polygonData;

    riverBasin.addData(JSON.parse(basin));
    lakeVictoria.addData(JSON.parse(lake));
    cropLand.addData(JSON.parse(cropland));

    riverBasin.bringToBack();
})
.catch(error => {
    console.log(error);
});


// ===================== POINT DATA ===============================================

// Hospitals
var hospitalIcon = L.divIcon({
    className:"hospital-icon",
    html:'<i class="fa fa-h-square" ></i>'
});

var hospitals = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.f_name, feature, layer);
    },
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
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.name_of_sc, feature, layer);
    },
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:primarySchoolIcon
        });
    }
});

// primarySchools.addTo(map);

var secondarySchoolIcon = L.divIcon({
    className:'secondary-school'
});

var secondarySchools = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.name_of_sc, feature, layer);
    },
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:secondarySchoolIcon
        });
    }
});

// secondarySchools.addTo(map);

// Irrigation Schemes
var irrigationSchemeIcon = L.divIcon({
    className:"irrigation"
});

var irrigationSchemes = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.scheme_nam, feature, layer);
    },
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:irrigationSchemeIcon
        });
    }
});

// irrigationSchemes.addTo(map);

// Villages
var villageIcon = L.divIcon({
    className:"village"
});

var villages = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.name, feature, layer);
    },
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:villageIcon
        });
    }
});

// villages.addTo(map);

// trading centres
var tradingCentreIcon = L.divIcon({
    className:"trading-center"
});

var tradingCentres = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.town_name, feature, layer);
    },
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:tradingCentreIcon
        });
    }
});

// tradingCentres.addTo(map);

// waterpoints
var waterPointIcon = L.divIcon({
    className:"water-point",
    html:'<i class="fa fa-tint text-primary"></i>'
});

var waterPoints = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.management, feature, layer);
    },
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:waterPointIcon
        });
    }
});

// waterPoints.addTo(map);

// settlement schemes
var settlementSchemeIcon = L.divIcon({
    className:"settlement-scheme"
});

var settlementSchemes = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.full_name, feature, layer);
    },
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:settlementSchemeIcon
        });
    }
});

// settlementSchemes.addTo(map);

// camps
var campIcon = L.icon({
    iconUrl:'/static/images/camp_hippo.png',
    iconSize:[30, 30],
    popupAnchor:[-3, -30]
});

var camps = L.geoJSON(null, {
    onEachFeature:function(feature, layer) {
        createPopup(feature.properties.name, feature, layer);
    },
    pointToLayer:function(geoObj, latLng) {
        return L.marker(latLng, {
            icon:campIcon
        });
    }
});

camps.addTo(map);


// Create Popup
function createPopup(title, feature, layer) {
    let popupString = "";
    let properties = feature.properties;

    for (const key in properties) {
        if (properties.hasOwnProperty(key)) {
            const element = properties[key];
            popupString += "<p class='popup-item'><strong>"+ key +"</strong>" + element +"</p>"
        }
    }

    let popupTitle = "<h5>"+ title + "</h5>";
    let popupContent = popupTitle + "<div class='popup-content'>"+  popupString +"</div>"
    layer.bindPopup(popupContent);
}

// Point Data
fetch('/point_data')
.then(response => {
    return response.json();
})
.then(pointData => {
    // console.log(pointData);
    let {hospital, primary, secondary, irrigation, 
        village, trading, waterPoint, settlement, camp} = pointData;

    // update the layers
    hospitals.addData(JSON.parse(hospital));
    primarySchools.addData(JSON.parse(primary));
    secondarySchools.addData(JSON.parse(secondary));
    irrigationSchemes.addData(JSON.parse(irrigation));
    villages.addData(JSON.parse(village));
    tradingCentres.addData(JSON.parse(trading));
    waterPoints.addData(JSON.parse(waterPoint));
    settlementSchemes.addData(JSON.parse(settlement));
    camps.addData(JSON.parse(camp));

    camps.bringToFront();

    spinner.addClass("d-none");
})
.catch(error => {
    console.log(error);
});

// load constituency data
fetch("/static/data/constituencies.geojson")
.then(response => response.json())
.then(data => {
    console.log(data);
    constituency.addData(data);
})
.catch(error => {
    console.error(error);
});

// load floadarea
fetch("/static/data/floodedarea.geojson")
.then(response => response.json())
.then(data => {
    console.log(data);
    floodedAreas.addData(data);

})
.catch(error => {
    console.error(error);
});

// layer groups
var overlays = {
    'Hospitals':hospitals,
    'Primary Schools':primarySchools,
    'Secondary Schools': secondarySchools,
    'Trading Centres':tradingCentres,
    'Water Points':waterPoints,
    'Villages':villages,
    'Irrigation Schemes':irrigationSchemes,
    'Settlement Scheme': settlementSchemes,
    'Crop Land':cropLand,
    'Camps':camps,
    'Constituency':constituency,
    'River Basin':riverBasin,
    'Flood Area':floodedAreas,
    'Affected Constituecy':affectedConstituecy
};

L.control.layers(baseLayer, overlays).addTo(map);

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
            layer.bindPopup("<h6 class='px-3'><strong>" + feature.properties.name + "</strong></h6><p class='popup-item'><strong>Distance</strong>"+feature.properties.distance +" Km</p>").openPopup();
        } else {
            layer.bindPopup("<p class='popup-item'><strong>My Location</strong></p>").openPopup();
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


// Affected features
var affectedFeatureIcon = L.icon({
    iconUrl:'/static/images/black.png',
    iconSize:[30, 70],
    popupAnchor:[-3, -30]
});

var affectedFeatures = L.geoJSON(null, {
    onEachFeature:function(feature,layer) {
        let popupString = "";
        let properties = feature.properties;

        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                const element = properties[key];
                popupString += "<p class='popup-item'><strong>"+ key +"</strong>" + element +"</p>"
            }
        }

        let popupContent = "<div class='popup-content'>"+ popupString +"</div>"
        layer.bindPopup(popupContent);
        
    },
    pointToLayer:function(geoObj, latlng) {
        return L.marker(latlng, {icon:affectedFeatureIcon})
    }
});

affectedFeatures.addTo(map);