const PubSub = require('../helpers/pub_sub.js');
const linkifyjsHtml = require('linkifyjs/html');
const event_list_view = require('./event_list_view.js');

const MapView = function (container) {
  this.container = container;
}

MapView.prototype.bindEvents = function () {

  PubSub.subscribe('Events:event-data-loaded', (evt) => {
   this.createMap(evt.detail);
   this.setMapMarkers(evt.detail);
   console.log(evt);
  });


}

  MapView.prototype.createMap = function (eventData) {
    const mapDiv = document.getElementById('mapid');
    console.log(mapDiv);
    document.getElementById('map-container').innerHTML = "<div id ='mapid'></div>";
    const latt = eventData[0].venue.latitude;
    const longt = eventData[0].venue.longitude;
    myMap = L.map('mapid', {
    center: [latt, longt],
    zoom: 10,
    zoomAnimation: true,
    duration: 2
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
    const eventLink =linkifyjsHtml(eventInformation[i].link);
    const eventImage = eventInformation[i].imageurl;
    const eventPrice = eventInformation[i].entryprice;
    // console.log(eventType);
    // console.log(venueName);
    const venueLat = eventInformation[i].venue.latitude;
    const venueLongt = eventInformation[i].venue.longitude;
    const eventMarker = L.marker([venueLat, venueLongt],{
      opacity: 1,
      title: venueName,
      riseOnHover: true,
      riseOffSet: 250
    })
    // console.log(eventMarker);

    eventMarker.addTo(myMap).on('click', onMapClickInfo).on('click', onMapClickZoom)
    .bindPopup(`Event: ${eventName} | Venue: ${venueName} | Type: ${eventType} | Tickets: ${eventLink} | cost ${eventPrice}`);
    popup = L.popup({
     keepInView: true,
     className: "popup"
    })
     }
  };

  function onMapClickInfo(e) {
    popup
    .setLatLng(e.latlng)
    .openOn(myMap);
  }

  function onMapClickZoom(e){
    myMap.setView(e.latlng, 12);
  };

module.exports = MapView;
