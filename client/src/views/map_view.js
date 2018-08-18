const PubSub = require('../helpers/pub_sub.js')
const MapView = function (container) {
  this.container = container;
}

MapView.prototype.bindEvents = function () {


  PubSub.subscribe('Events:event-data-loaded', (evt) => {
   this.createMap();
   this.getLatLongFromData(evt.detail);


   // const eventInformation = evt.detail;
   // for(var i = 0; i <eventInformation.length; i++){
   // const venueLat = eventInformation[i].venue.latitude;
   // const venueLongt = eventInformation[i].venue.longitude;
   // const coordinates = L.latLng(venueLat, venueLongt);
   //  }
  });

}

  MapView.prototype.createMap = function () {
  myMap = L.map('mapid', {
    center: [51.505, -0.09],
    zoom: 10
  })
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  };

  MapView.prototype.getLatLongFromData = function (eventData) {
    const eventInformation = eventData;
    for(var i = 0; i <eventInformation.length; i++){
    const venueLat = eventInformation[i].venue.latitude;
    console.log(venueLat);
    const venueLongt = eventInformation[i].venue.longitude;
    console.log(venueLongt);
    const eventMarker = L.marker([venueLat, venueLongt]);
    eventMarker.addTo(myMap);
     }
  };


module.exports = MapView;
