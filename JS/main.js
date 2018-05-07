stations = "https://raw.githubusercontent.com/gduer/BARTtsy/master/bartData.json";


var map = L.map('map', {
  center: [37.6918, -122.2001],
  zoom: 10
});

var Stamen_TonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

function radiusFun(){
  return 6;//feature.properties.Weekday.CIVC;
}

function consoleName(feature, layer) {
    //bind click
    layer.on('click', function (e) {
      console.log(layer.feature.properties.Code);//.morningPeak.EMBR);
      //stationFeatureGroup.setStyle({radius:  Math.sqrt(layer.feature.properties.Weekday.morningPeak.EMBR)*2});
      restyleLayer(layer.feature.properties.Code);
      //this.setStyle({fillColor:"#f00"});
    });
}

function restyleLayer(propertyName) {

    stationFeatureGroup.eachLayer(function(layer) {
        if (layer.feature.properties.Weekday.morningPeak[propertyName] == undifined){radiusValue =  1;}
        else { radiusValue = layer.feature.properties.Weekday.morningPeak[propertyName];}

        layer.setStyle({
            radius: radiusValue
        });
    });
}


var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#551A8B",
    color: "#000",
    weight: 2,
    opacity: 0.3,
    fillOpacity: 0.6
};

$(document).ready(function() {
  $.ajax(stations).done(function(data) {
      var parsedData = JSON.parse(data);
      stationFeatureGroup = L.geoJson(parsedData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);},
        onEachFeature: consoleName}).addTo(map);

    });
    });
