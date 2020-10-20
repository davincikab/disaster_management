var spinner = $('#spinner');
var map = L.map('map', {
    center: [0.099242, 34.051121],
    zoom: 13,
});  

// add a tile Layer
var cartoLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
    attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
    minZoom: 0
}).addTo(map);

// camps
var allCampsData;
var campsIcon =  L.icon({
    iconUrl:'/static/images/black.png',
    iconSize:[30, 70],
    popupAnchor:[-3, -30]
});

var inActiveCampIcon = L.icon({
    iconUrl:'/static/images/start.png',
    iconSize:[30, 70],
    popupAnchor:[-3, -30]
});

var camps = L.geoJson(null, {
    onEachFeature:function(feature, layer) {
        let popupContent = "<div class='popup-content'>"+
        "<img class='popup-img' src='/media/"+ feature.properties.image +"' alt='"+ feature.properties.name +"'>"+
        "<div class='popup-footer'>"+
        "<h5 class='card-title'>" + feature.properties.name + "</h5>"+
        "<div class='text-description d-flex bg-white'>"+
        "<span class='d-flex'><strong>Population</strong>"+ feature.properties.population +"</span>"+
        "<span class='d-flex'><strong>Capacity</strong>"+ feature.properties.capacity +"</span>"+
        "</div>"+
        "<div class='edit-section d-flex'><div class='bg-primary text-white mr-1' onclick='updateCamp("+ feature.properties.pk +")'><i class='fa fa-pencil-square'></i></div>"+ 
        "<div class='bg-danger text-white' onclick='deleteCamp("+ feature.properties.pk +")'><i class='fa fa-trash'></i></div>"+
        "</div>"+
        "</div>"+
        "</div>";

        layer.bindPopup(popupContent);

        // layer.on('click', function(e) {
        //     // highlight the feature on the 
        // });
    },
    pointToLayer:function(geoObj, latlng){
        if(!geoObj.properties.is_active) {
            return L.marker(latlng, {icon:inActiveCampIcon})
        }
        return L.marker(latlng, {icon:campsIcon})
    }
});

camps.addTo(map);

// load camps
function fetchCamp() {
    fetch("/get_camps/")
    .then(response => response.json())
    .then(campsData => {
        console.log(campsData);
        
        camps.clearLayers();
        camps.addData(campsData);

        allCampsData = campsData;
        createCardList(allCampsData);
        spinner.addClass("d-none");
    })
    .catch(error => {
        console.error(error);
    });
}


fetchCamp();

function createCardList(allCamps) {
    var campsString = "";
    allCamps.features.forEach(element => {
        let status = element.properties.is_active ? ['success','Active']: ['danger','Inactive'];
        let date = new Date(element.properties.commissoned);

        let campDOM = '<div class="card mb-3" id="'+ element.properties.key +'">'+
        '<img src="/media/'+ element.properties.image+'" class="card-img-top" alt="...">'+
        ' <div class="card-body">'+
            '<h5 class="card-title mb-1">'+ element.properties.name+'</h5>'+
            '<p class="card-text"><span>Capacity</span>'+ element.properties.capacity +'</p>'+
            '<p class="card-text"><span>Population</span>'+ element.properties.population + '</p>'+
            '<span class="badge badge-pill badge-' + status[0] + '">' + status[1] + '</span>'+
            '<p class="commision-date"><small class="text-muted">'+ date.toDateString() +'</small></p>'+
        ' </div>'+
         '</div>';

        campsString += campDOM;
    });

    $('#camps-list').html("");
    $('#camps-list').html(campsString);
}

// CRUD camps
var campLocation;
var isCreateUpdateMode = false;
map.on('click', function(e) {
    if(isCreateUpdateMode) {
        campLocation = Object.values(e.latlng).reverse();
        campsCreateModal.modal('show');
    }
});

$('#create-camp-toggler').on('change', function(e) {
    isCreateUpdateMode = e.target.checked;
});

// modals
var campsCreateModal = $('#camps-modal');
var campsCreateUpdateForm = $("#create-form");
let formElement = document.querySelector("#create-form");
var actionText = $("#action-text");

var dData;

campsCreateUpdateForm.on('submit', function(e) {
    e.preventDefault();
    spinner.addClass("d-none");
    dData = new FormData(formElement);

    // add form data
    let data = campsCreateUpdateForm.serializeArray();
    console.log(data);

    // add point data
    dData.append('geom', campLocation.join(" "));

    // add camp_id if any
    let camp_id = campsCreateUpdateForm.attr('data-key');
    console.log("Camp Id: " + camp_id);
    if(camp_id) {
        dData.append('camp_id', camp_id);
    }
    
    // oupute
    console.log(dData.get('camp_id'));

    // send the data to the db
    fetch('/create_update_camp/',{
        method: 'POST',
        body:dData,
    })
    .then(response => response.json())
    .then(res => {
        console.log(res);
       if(res.message == 'success') {
           campsCreateModal.modal('hide');
           fetchCamp();

           isCreateUpdateMode = false;
           $('#create-camp-toggler')[0].checked = false;

           actionText.text('Add a Camp');
           formElement.reset();
           campsCreateUpdateForm.attr('data-key', "");
           spinner.removeClass("d-none");
       } else {
        // 
        console.log(res);
        spinner.removeClass("d-none");
       }
    })
    .catch(error => {
        console.error(error);
        spinner.removeClass("d-none");
    });

});

// create or update camps
function updateCamp(camp_id) {
    console.log(camp_id);
    let camp = allCampsData.features.find(feature => feature.properties.pk = camp_id);
    console.log(camp);

    actionText.text("Update Camp "+ camp.properties.name);
    campLocation = [...camp.geometry.coordinates];
    // draggable marker
    

    // update the form values
    $("#id_name").val(camp.properties.name.toString());
    $("#id_population").val(camp.properties.population);
    $("#id_capacity").val(camp.properties.capacity);
    $("#id_is_active")[0].checked = camp.properties.is_active;

    campsCreateUpdateForm.attr('data-key', camp_id);

    // display modal
    campsCreateModal.modal('show');
}

$('#dismiss-location').on('click', function(e) {
    actionText.text('Add a Camp');
    formElement.reset();
    campsCreateUpdateForm.attr('data-key', "");
});

// delete a camp
var deleteModal = $('#camps-delete');
var confirmDeleteButton = $('#confirm-delete');
function deleteCamp(camp_id) {
    // prompt the user to comfirm delete
    deleteModal.modal('show');

    // update the camp_id
    confirmDeleteButton.attr('data-key', camp_id);
}

confirmDeleteButton.on('click', function(e){
    spinner.removeClass("d-none");
    // get the id
    let camp_id = confirmDeleteButton.attr('data-key');

    // 
    let url = "/delete_camp/" + camp_id + "/";
    fetch(url, {
        method:'DELETE'
    })
    .then(response => response.json())
    .then(res => {
        console.log(res);
        deleteModal.modal('hide');
        fetchCamp();

        spinner.addClass("d-none");
    }).catch(error => {
        console.error(error);
        spinner.addClass("d-none");
    });

});


// search camp by name
$('#camp-search').on('input', function(e) {
    let value = e.target.value;
    let data = JSON.parse(JSON.stringify(allCampsData));

    if(value == "") {
        createCardList(data);
    } else {
        data.features = data.features.filter(feature => {
            if(
                feature.properties.name.toLowerCase().includes(
                    value.toLowerCase()
                )
            ) {
                return feature
            }
        });

        if(data.features.length == 0 ){
            $('#camps-list').html("");
            $('#camps-list').html("0 results found with name <b>"+ value +"</b>");
        } else {
            createCardList(data);
        }
    }

    // update map 
    camps.clearLayers();
    camps.addData(data);

});