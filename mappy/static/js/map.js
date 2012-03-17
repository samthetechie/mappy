// var API = root.API,
//     TILES_URL = root.TILES_URL;

var map,
    features = {},
    geojsonLayer = new L.GeoJSON();

$(function() {
    initMap();

    getAllFeatures();

    PUBNUB.subscribe({
        channel: "features",
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
    addFeature(e.latlng);
}

function addFeature(latlng) {
    $.post(API.features, {lon: latlng.lng, lat: latlng.lat});
}
