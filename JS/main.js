stations = "https://raw.githubusercontent.com/gduer/BARTtsy/master/bartData.json"


var map = L.map('map', {
  center: [37.6918, -122.2001],
  zoom: 10
});

var Stamen_TonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


$(document).ready(function() {
  $.ajax(stations).done(function(data) {
      var parsedData = JSON.parse(data);
      _.each(parsedData, function(item){ L.circleMarker([item.geometry.lat,item.geometry.lon]).addTo(map).bindPopup(item.Name);});
});
});
