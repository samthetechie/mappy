// var API = root.API,
//     TILES_URL = root.TILES_URL;

var map,
    popup,
    features = {},
    geojsonLayer = new L.GeoJSON();

$(function() {
    initMap();

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

function initMap() {
    map = new L.Map('map');

    var cloudmade = new L.TileLayer(TILES_URL, {
        // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        subdomains: ['otile1', 'otile2', 'otile3', 'otile4'],
        maxZoom: 18
    });

    var london = new L.LatLng(51.505, -0.09);
    map.setView(london, 13)

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
    popup = new L.Popup();
    var template = $('#template_feature_form').html();
    var content = Mustache.to_html(template, {'lon': e.latlng.lng.toFixed(4), 
                                              'lat': e.latlng.lat.toFixed(4)});
    popup.setLatLng(e.latlng);
    popup.setContent(content);
    map.openPopup(popup);
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
