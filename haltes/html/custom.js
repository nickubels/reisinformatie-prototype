function initmap(){
    var map = L.map('map');
    var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
    map.setView(new L.LatLng(52.371, 4.899),13);
    map.addLayer(osm);
}

function loadMunicipality(code){
    
}