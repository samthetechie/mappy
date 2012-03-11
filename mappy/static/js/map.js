$(function(){
    initMap();
});

function initMap() {
    var map = new L.Map('map');

    var cloudmade = new L.TileLayer(TILES_URL, {
        // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    });

    map.addLayer(cloudmade);

    map.locateAndSetView(18);

    // events
    map.on('click', onMapClick);
}

function onMapClick(e) {
    addFeature(e.latlng);
}

function addFeature(latlng) {
    console.log(latlng);
    //console.log('adding', JSON.stringify(latlng));
    $.post(API.add, {lat: latlng.lat, lng: latlng.lng},
        function(data) {
            console.log('response:', data);
        }
    );
}