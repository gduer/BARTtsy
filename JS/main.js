stations = "https://raw.githubusercontent.com/gduer/BARTtsy/master/bartData_dest.json";
lines = "https://raw.githubusercontent.com/gduer/BARTtsy/master/BART_line.json";
var daytime = 'earlyMorning';
var code = "";
var weektime = "Weekday";

var map = L.map('map', {
  center: [37.7723, -122.2921],
  zoom: 11
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


$('#directionDropdown').change(function(){
  if($('#directionDropdown').val() === 'Origin:'){
    stations = "https://raw.githubusercontent.com/gduer/BARTtsy/master/bartData_dest.json";

  }
  else{stations = "https://raw.githubusercontent.com/gduer/BARTtsy/master/bartData_orig.json";}

  $('#stationName').text("(Pick a Station on the Map)");
  $('#stationName').css("font-weight", "normal");
  $('#stationName').css("font-size", "16px");

  $(document).ready(function() {
    stationFeatureGroup.eachLayer(function (layer) {
      stationFeatureGroup.removeLayer(layer);
    });

    stationFeatureGroup.eachLayer(function(layer) {
        layer.setStyle({
          radius: 4,
          fillColor: "#551A8B",
          color: "#000",
          weight: 2,
          opacity: 0.3,
          fillOpacity: 0.6,
          className: 'animated-icon'
        });
    });

  $.ajax(stations).done(function(data) {
      var parsedData = JSON.parse(data);
      stationFeatureGroup = L.geoJson(parsedData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);},
        onEachFeature: whenClicked}).addTo(map);
      });
});
});



function whenClicked(feature, layer) {
    layer.bindPopup(layer.feature.properties.Name + " STATION", customOptions);
    //bind click
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on('mouseout', function (e) {
              this.closePopup();
    });

    layer.on('click', function (e) {
      code = layer.feature.properties.Code;
      name = layer.feature.properties.Name;
      restyleLayer(layer.feature.properties.Code);
      $('#stationName').text(layer.feature.properties.Name + " STATION");
      $('#stationName').css("font-weight", "bold");
      $('#stationName').css("font-size", "20px");
      stationFeatureGroup.eachLayer(function(layer) {
      if($('#directionDropdown').val() === 'Destination:'){layer._popup.setContent(layer.feature.properties.Name + " to " + name + ": " + String(layer.feature.properties[weektime][daytime][code]) + " passenger(s)");}
      if($('#directionDropdown').val() === 'Origin:'){layer._popup.setContent(name + " to " + layer.feature.properties.Name + ": " + String(layer.feature.properties[weektime][daytime][code]) + " passenger(s)");}
      if(layer.feature.properties.Name == name){layer._popup.setContent(name + " STATION");}
      });
    });
}

function restyleLayer(stationCode) {

    stationFeatureGroup.eachLayer(function(layer) {
        if (layer.feature.properties[weektime][daytime][stationCode] == undefined){radiusValue =  4;}
        else { radiusValue = Math.sqrt(layer.feature.properties[weektime][daytime][stationCode])*3;}
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
          layer.setStyle({fillColor:"#00C851", radius: 5, opacity: 0.6});
        }
    });
}


var geojsonMarkerOptions = {
    radius: 4,
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
  stationFeatureGroup.eachLayer(function(layer) {
  if($('#directionDropdown').val() === 'Destination:'){layer._popup.setContent(layer.feature.properties.Name + " to " + name + ": " + String(layer.feature.properties[weektime][daytime][code]) + " passenger(s)");}
  if($('#directionDropdown').val() === 'Origin:'){layer._popup.setContent(name + " to " + layer.feature.properties.Name + ": " + String(layer.feature.properties[weektime][daytime][code]) + " passenger(s)");}
  if(layer.feature.properties.Name == name){layer._popup.setContent(name + " STATION");}
  });}, 0);

});

$('#weektimes').on('click', function(e){
  setTimeout(function () {
  pickDay();
  restyleLayer(code);
  stationFeatureGroup.eachLayer(function(layer) {
  if($('#directionDropdown').val() === 'Destination:'){layer._popup.setContent(layer.feature.properties.Name + " to " + name + ": " + String(layer.feature.properties[weektime][daytime][code]) + " passenger(s)");}
  if($('#directionDropdown').val() === 'Origin:'){layer._popup.setContent(name + " to " + layer.feature.properties.Name + ": " + String(layer.feature.properties[weektime][daytime][code]) + " passenger(s)");}
  if(layer.feature.properties.Name == name){layer._popup.setContent(name + " STATION");}
  });}, 0);

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
        onEachFeature: whenClicked}).addTo(map);

    });

    });

map.on('click', function (e) {
  $('#stationName').text("(Pick a Station on the Map)");
  $('#stationName').css("font-weight", "normal");
  $('#stationName').css("font-size", "16px");
  stationFeatureGroup.eachLayer(function(layer) {
  layer._popup.setContent(name + " STATION");
  });
  stationFeatureGroup.eachLayer(function(layer) {
      layer.setStyle({
        radius: 4,
        fillColor: "#551A8B",
        color: "#000",
        weight: 2,
        opacity: 0.3,
        fillOpacity: 0.6,
        className: 'animated-icon'
      })
      ;
  });

});

function play(){
     var audio = document.getElementById("audio");
     audio.play();
               }
