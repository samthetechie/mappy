// var API = root.API,
//     TILES_URL = root.TILES_URL;

var map,
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
	minZoom: 0,			
	maxZoom: 5,
	tileSize: 256,
	continuousWorld: true,
	attribution: '29C3-usermap'
    });

    var london = new L.LatLng(-70.68542, -83.54004);
    map.setView(london, 5)

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
