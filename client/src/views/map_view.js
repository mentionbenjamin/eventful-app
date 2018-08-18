const PubSub = require('../helpers/pub_sub.js');
const linkifyjsHtml = require('linkifyjs/html');
const MapView = function (container) {
  this.container = container;
}

MapView.prototype.bindEvents = function () {


  PubSub.subscribe('Events:event-data-loaded', (evt) => {
   this.createMap();
   this.setMapMarkers(evt.detail);

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

  MapView.prototype.setMapMarkers = function (eventData) {
    const eventInformation = eventData;
    for(var i = 0; i <eventInformation.length; i++){
    const venueName = eventInformation[i].venue.name.toString();
    const eventType = eventInformation[i].EventCode;
    const eventName = eventInformation[i].eventname;
    const eventLinkText = eventInformation[i].link;
    const eventLinkURL = linkifyjsHtml(eventLinkText);
    const eventImage = eventInformation[i].imageurl;
    console.log(eventType);
    console.log(venueName);
    const venueLat = eventInformation[i].venue.latitude;
    const venueLongt = eventInformation[i].venue.longitude;
    const eventMarker = L.marker([venueLat, venueLongt],{
      opacity: 0.5,
      title: venueName,
      riseOnHover: true,
      riseOffSet: 250
    })
    console.log(eventMarker);

    eventMarker.addTo(myMap).on('click', onMapClick)
    .bindPopup(`Event: ${eventName} | Venue: ${venueName} | Type: ${eventType} | Link: ${eventLinkURL}`);
    popup = L.popup({
     keepInView: true,
     className: "popup"
    })
     }
  };

  function onMapClick(e) {
    popup
    .setLatLng(e.latlng)
    .openOn(myMap);
  }

module.exports = MapView;
