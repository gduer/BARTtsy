stations = "https://raw.githubusercontent.com/gduer/BARTtsy/master/bartData_orig.json";
//stations = ""

lines = "https://raw.githubusercontent.com/gduer/BARTtsy/master/BART_line.json";
var daytime = 'earlyMorning';
var code = "";
var weektime = "Weekday";

var map = L.map('map', {
  center: [37.6918, -122.2001],
  zoom: 10
});

var Stamen_TonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var customOptions =
    {
    'className' : 'custom-popup'
  };

function popupName(feature, layer) {

    if(code != ""){
    layer.bindPopup("Coming from: " + layer.feature.properties.Name + ": " + layer.feature.properties[weektime][daytime][stationCode], customOptions);
    }

    else{layer.bindPopup(layer.feature.properties.Name, customOptions);}
    //bind click
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on('mouseout', function (e) {
              this.closePopup();
    });

    layer.on('click', function (e) {
      console.log(layer.feature.properties.Code);//.morningPeak.EMBR);
      code = layer.feature.properties.Code;
      //stationFeatureGroup.setStyle({radius:  Math.sqrt(layer.feature.properties.Weekday.morningPeak.EMBR)*2});
      restyleLayer(layer.feature.properties.Code);
      $('#stationName').text(layer.feature.properties.Name + " STATION");
      $('#stationName').css("font-weight", "bold");
      $('#stationName').css("font-size", "20px");
      //$('#stationName').splitFlap();
      //this.setStyle({fillColor:"#0f0", radius: 4, opacity: 0.6});
    });
}

function restyleLayer(stationCode) {

    stationFeatureGroup.eachLayer(function(layer) {
        if (layer.feature.properties[weektime][daytime][stationCode] == undefined){radiusValue =  3;}
        else { radiusValue = Math.sqrt(layer.feature.properties[weektime][daytime][stationCode])*2;}
        layer.setStyle({
            radius: radiusValue,
            fillColor:"#551A8B",
            color: "#000",
            weight: 2,
            opacity: 0.3,
            fillOpacity: 0.6,
            className: 'animated-icon'
        });
        if(layer.feature.properties.Code == code){
          layer.setStyle({fillColor:"#0f0", radius: 4, opacity: 0.6});
        }
    });
}


var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#551A8B",
    color: "#000",
    weight: 2,
    opacity: 0.3,
    fillOpacity: 0.6,
    className: 'animated-icon'
};

function pickHour(){
  return document.getElementById('time1').checked  ?        daytime = 'earlyMorning' :
         document.getElementById('time2').checked  ?        daytime = 'morningPeak' :
         document.getElementById('time3').checked  ?        daytime = 'midDay' :
         document.getElementById('time4').checked  ?        daytime = 'eveningPeak': daytime = 'night';
}

function pickDay(){
  return document.getElementById('weekday').checked  ?        weektime = 'Weekday' : weektime = 'Weekend';
}

$('#daytimes').on('click', function(e){
  setTimeout(function () {
  pickHour();
  restyleLayer(code);
  console.log(daytime);}, 0);

});

$('#weektimes').on('click', function(e){
  setTimeout(function () {
  pickDay();
  restyleLayer(code);
  console.log(weektime);}, 0);

});

$(document).ready(function() {
  $.ajax(lines).done(function(data) {
      var lineData = JSON.parse(data);
      linesFeatureGroup = L.geoJson(lineData, {
        style: {weight: 3, color: "#808080", dashArray: "5 10", opacity: 0.15}
      }).addTo(map);
        });

  $.ajax(stations).done(function(data) {
      var parsedData = JSON.parse(data);
      stationFeatureGroup = L.geoJson(parsedData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);},
        onEachFeature: popupName}).addTo(map);

    });

    });

map.on('click', function (e) {
  $('#stationName').text("(Pick a Station on the Map)");
  $('#stationName').css("font-weight", "normal");
  $('#stationName').css("font-size", "16px");
  stationFeatureGroup.eachLayer(function(layer) {
      layer.setStyle({
        radius: 3,
        fillColor: "#551A8B",
        color: "#000",
        weight: 2,
        opacity: 0.3,
        fillOpacity: 0.6,
        className: 'animated-icon'
      });
  });

});
