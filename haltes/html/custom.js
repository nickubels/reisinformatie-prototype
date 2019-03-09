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
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function onEachFeature(feature, layer) {
    layer.bindTooltip(feature.properties.quayname);
    layer.on('click', function (e) {
      console.log(e.target.feature);
      document.getElementById("info").innerHTML = fillTemplate(e.target.feature.properties);
    });
}

function loadMunicipality(code){
    jQuery.getJSON("../data/amsterdam.json", function(data) {
        // console.log(data);
        L.geoJson(data, { pointToLayer: function (feature, latlng) {
            geojsonMarkerOptions.fillColor = feature.properties['marker-color']
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }, onEachFeature: onEachFeature}).addTo(map);
    });
    // L.geoJSON(geojsonFeature).addTo(map);
}

function getQuayStatus(value){
    switch(value){
        case 'plan':
            return 'Gepland';
        case 'available':
            return 'Beschikbaar';
        case 'unavailable':
            return 'Niet beschikbaar';
        case 'expired':
            return 'Vervallen';
        case 'deleted':
            return 'Verwijderd';
        default:
            return 'Onbekend';
    }
}

function getStopPlaceType(value){
    switch(value){
        case 'ferryPort':
            return 'Steiger';
        case 'busStation':
            return 'Busstation';
        case 'metroStation':
            return 'Metrostation';
        case 'onstreetBus':
            return 'Bushalte';
        case 'onstreetTram':
            return 'Tramhalte';
        case 'railStation':
            return 'Treinstation';
        case 'tramStation':
            return 'Tramstation';
        case 'combiTramBus':
            return 'Combinatie tram/bus';
        case 'combiMetroTram':
            return 'Combinatie metro/tram';
        default:
            return 'Overig';
    }
}

function fillTemplate(properties){
    return `
        <h4>${properties.quayname} <small class="text-muted">${properties.quaycode}</small></h4>
        <div class="accordion" id="chbData">
            <div class="card">
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#general" aria-expanded="true" aria-controls="general">
                Algemene informatie
                </button>
              </h2>
            </div>

            <div id="general" class="collapse show" aria-labelledby="headingOne" data-parent="#chbData">
                <div class="card-body">
                    <dl class="row">
                        <dt class="col-sm-6">Naam</dt>
                        <dd class="col-sm-6">${properties.quayname}</dd>
                        <dt class="col-sm-6">Publieke naam</dt>
                        <dd class="col-sm-6">${properties.publicname}</dd>
                        <dt class="col-sm-6">Plaats</dt>
                        <dd class="col-sm-6">${properties.town}</dd>
                        <dt class="col-sm-6">Type</dt>
                        <dd class="col-sm-6">${getStopPlaceType(properties.stopplacetype)}</dd>
                        <dt class="col-sm-6">Haltetype</dt>
                        <dd class="col-sm-6">${properties.quaytype}</dd>
                        <dt class="col-sm-6">Status</dt>
                        <dd class="col-sm-6">${getQuayStatus(properties.quaystatus)}</dd>
                    </dl>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#geometry" aria-expanded="false" aria-controls="geometry">
                  Geometrie en locatie
                </button>
              </h2>
            </div>
            <div id="geometry" class="collapse" aria-labelledby="headingTwo" data-parent="#chbData">
              <div class="card-body">
                
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#accessability" aria-expanded="false" aria-controls="accessability">
                  Toegankelijkheid
                </button>
              </h2>
            </div>
            <div id="accessability" class="collapse" aria-labelledby="headingThree" data-parent="#chbData">
              <div class="card-body">
                
              </div>
            </div> 
          </div>
          <div class="card">
            <div class="card-header" id="headingFour">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#facility" aria-expanded="false" aria-controls="facility">
                  Faciliteiten
                </button>
              </h2>
            </div>
            <div id="facility" class="collapse" aria-labelledby="headingFour" data-parent="#chbData">
              <div class="card-body">
                <dl class="row">
                        <dt class="col-sm-6">Fietsenstalling</dt>
                        <dd class="col-sm-6">${properties.bicycleparking ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Fietsplekken</dt>
                        <dd class="col-sm-6">${properties.numberofbicycleplaces}</dd>
                        <dt class="col-sm-6">Prullenbak</dt>
                        <dd class="col-sm-6">${properties.bins ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Verlichting</dt>
                        <dd class="col-sm-6">${properties.illuminatedstop ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Informatiepaneel</dt>
                        <dd class="col-sm-6">${properties.bicycleparking ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Stasteun</dt>
                        <dd class="col-sm-6">${properties.leantosupport ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">OVC opladen</dt>
                        <dd class="col-sm-6">${properties.ovcharging ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">OVC CiCo</dt>
                        <dd class="col-sm-6">${properties.ovcico ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">DRIS</dt>
                        <dd class="col-sm-6">${properties.passengerinformationdisplay ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Aantal regels op DRIS</dt>
                        <dd class="col-sm-6">${properties.passengerinformationdisplaytype}</dd>
                        <dt class="col-sm-6">Audio DRIS</dt>
                        <dd class="col-sm-6">${properties.audiobutton ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Lijnnetkaart</dt>
                        <dd class="col-sm-6">${properties.routenetworkmap ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Haltevertrekstaat</dt>
                        <dd class="col-sm-6">${properties.timetableinformation ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Zitgelegenheid</dt>
                        <dd class="col-sm-6">${properties.seatavailable ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Abri</dt>
                        <dd class="col-sm-6">${properties.shelter ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Reclame in abri</dt>
                        <dd class="col-sm-6">${properties.shelterpublicity ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Haltebord</dt>
                        <dd class="col-sm-6">${properties.stopsign ? "Aanwezig" : "Niet aanwezig"}</dd>
                        <dt class="col-sm-6">Type haltebord</dt>
                        <dd class="col-sm-6">${properties.stopsigntype}</dd>
                </dl>
              </div>
            </div> 
          </div>
        </div>
    `;
}
