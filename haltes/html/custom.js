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
                        <dt class="col-sm-3">Type</dt>
                        <dd class="col-sm-9">${getStopPlaceType(properties.stopplacetype)}</dd>
                        <dt class="col-sm-3">Status</dt>
                        <dd class="col-sm-9">${getQuayStatus(properties.quaystatus)}</dd>
                    </dl>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Collapsible Group Item #2
                </button>
              </h2>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div class="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>
        </div>
    `;
}
