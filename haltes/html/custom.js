var map;

function initmap(){
    map = L.map('map');
    var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
    map.setView(new L.LatLng(52.371, 4.899),13);
    map.addLayer(osm);
}

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function onEachFeature(feature, layer) {
    layer.bindTooltip(feature.properties.quayname);
}

function loadMunicipality(code){
    jQuery.getJSON("../data/amsterdam.json", function(data) {
        console.log(data);
        L.geoJson(data, { pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }, onEachFeature: onEachFeature}).addTo(map);
    });
    // L.geoJSON(geojsonFeature).addTo(map);
}