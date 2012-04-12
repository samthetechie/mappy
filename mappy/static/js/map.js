// var API = root.API,
//     TILES_URL = root.TILES_URL;

var map,
    popup,
    features = {},
    geojsonLayer = new L.GeoJSON(),
    bMarkerMode = false,
    bPolylineMode = false,
    bPolygonMode = false;

$(function() {
    initMap();
    initButtons();

    getAllFeatures();

    PUBNUB.subscribe({
        channel: CHANNELS.features,
        callback: function(features) {
            geojsonLayer.addGeoJSON(features);
        },
        error: function(e) {
            // Do not call subscribe() here!
            // PUBNUB will auto-reconnect.
            console.log(e);
        }
    });
});


function initButtons(){
    //marker
    $('#markerdefine').toggle(function() {
        bMarkerMode = true;
        bPolylineMode = false;
        bPolygonMode = false;
        console.log("Marker Mode Enabled");
    }, function() {
        bMarkerMode = false;
        bPolylineMode = false;
        bPolygonMode = false;        
        console.log("Marker Mode Disabled");
    });

    //polyline
    $('#polylinedefine').toggle(function() {
        bMarkerMode = false;
        bPolylineMode = true;
        bPolygonMode = false;
        console.log("Polyline Mode Enabled");
    }, function() {
        bMarkerMode = false;
        bPolylineMode = false;
        bPolygonMode = false;
        console.log("Polyline Mode Disabled");
    });

    //polygon
    $('#polygondefine').toggle(function() {
        bMarkerMode = false;
        bPolylineMode = false;
        bPolygonMode = true;
        console.log("Polygon Mode Enabled");
    }, function() {
        bMarkerMode = false;
        bPolylineMode = false;
        bPolygonMode = false;
        console.log("Polygon Mode Disabled");
    });
    
    $('#markerlist').click(function() {
        console.log("Marker List Clicked");   //only fires when an option is chosen from this list!
    });
    
    $('#polylinelist').click(function() {
        console.log("Polyline List Clicked"); //only fires when an option is chosen from this list!
    });  
    
    $('#polygonlist').click(function() {
        console.log("Polygon List Clicked");  //only fires when an option is chosen from this list!
    });

    //marker buttons    
    $('#markerzoom').click(function() {
        console.log("Marker Zoom Clicked"); 
    });
      
    $('#markerpan').click(function() {
        console.log("Marker Pan Clicked"); 
    });

    $('#markeredit').click(function() {
        console.log("Marker Edit Clicked"); 
    });

    $('#markerrename').click(function() {
        console.log("Marker Rename Clicked"); 
    });              

    $('#markerremove').click(function() {
        console.log("Marker Remove Clicked"); 
    });
    
    //polyline buttons    
    $('#polylinezoom').click(function() {
        console.log("Polyline Zoom Clicked"); 
    });
      
    $('#polylinepan').click(function() {
        console.log("Polyline Pan Clicked"); 
    });

    $('#polylineedit').click(function() {
        console.log("Polyline Edit Clicked"); 
    });

    $('#polylinerename').click(function() {
        console.log("Polyline Rename Clicked"); 
    });              

    $('#polylineremove').click(function() {
        console.log("Polyline Remove Clicked"); 
    });
    
    //polygon buttons    
    $('#polygonzoom').click(function() {
        console.log("Polygon Zoom Clicked"); 
    });
      
    $('#polygonpan').click(function() {
        console.log("Polygon Pan Clicked"); 
    });

    $('#polygonedit').click(function() {
        console.log("Polygon Edit Clicked"); 
    });

    $('#polygonrename').click(function() {
        console.log("Polygon Rename Clicked"); 
    });              

    $('#polygonremove').click(function() {
        console.log("Polygon Remove Clicked"); 
    });
        

}

function initMap() {
    map = new L.Map('map');

    var cloudmade = new L.TileLayer(TILES_URL, {
        // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        subdomains: ['otile1', 'otile2', 'otile3', 'otile4'],
        maxZoom: 18
    });

    var london = new L.LatLng(51.505, -0.09);
    var ny = new L.LatLng(40.7300, -73.9811);    
    map.setView(ny, 13)

    map.addLayer(cloudmade);

    // map.locate(setView=true);

    map.addLayer(geojsonLayer);

    // events
    map.on('click', onMapClick);

    geojsonLayer.on("featureparse", function (e) {
        // Initialize popups with feature properties
        if (!e.properties) {
            e.properties = {};
        }
        //e.properties['_id'] = e.id;
        e.layer.bindPopup(buildPopupContent(e.properties));
        // Keep a reference on Marker
        //markers[e.id] = e.layer;
        //initMarker(e.layer, e.properties);
    });
}

function getAllFeatures() {
    $.getJSON(API.features, function(data, status) {
        // geojsonLayer.on("featureparse", function (e) {
            
        // });
        if (data) {
            geojsonLayer.addGeoJSON(data);
        }
    });

}

function onMapClick(e) {

    if (bMarkerMode){
    console.log("bMarkerMode is True and the map was clicked");
        popup = new L.Popup();
        var template = $('#template_feature_form').html();
        var content = Mustache.to_html(template, {'lon': e.latlng.lng.toFixed(4), 
                                                  'lat': e.latlng.lat.toFixed(4)});
        popup.setLatLng(e.latlng);
        popup.setContent(content);
        map.openPopup(popup);    
    }
    else{
    console.log("bMarkerMode is False and the map was clicked");
    }
}

function addFeature(form) {
    console.log($(form).serialize());
    $.post(API.features, $(form).serialize());
    map.closePopup(popup);
    return false;
    // $.post(API.features, {lon: latlng.lng, lat: latlng.lat});
}

function buildPopupContent(properties) {
    var template = $('#template_feature').html();
    return Mustache.to_html(template, properties);
}
