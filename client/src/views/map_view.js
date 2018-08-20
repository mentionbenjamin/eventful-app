const PubSub = require('../helpers/pub_sub.js');
const linkifyjsHtml = require('linkifyjs/html');
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
    const latt = eventData[0].venue.latitude;
    const longt = eventData[0].venue.longitude;
    myMap = L.map('mapid', {
    center: [latt, longt],
    zoom: 10
  })
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  };

  MapView.prototype.setMapMarkers = function (eventData) {


    const eventInformation = eventData;
    for(var i = 0; i <eventInformation.length; i++){
    const markerLayer =  L.layerGroup().addTo(myMap);
    // const venueName = eventInformation[i].venue.name.toString();
    // const eventType = eventInformation[i].EventCode;
    // const eventName = eventInformation[i].eventname;
    // const eventLinkText = eventInformation[i].link;
    // const eventLinkURL = linkifyjsHtml(eventLinkText);
    // const eventImage = eventInformation[i].imageurl;
    const venueLat = eventInformation[i].venue.latitude;
    const venueLongt = eventInformation[i].venue.longitude;
    const eventMarker = L.marker([venueLat, venueLongt],{
      // title: venueName,
      riseOnHover: true,
      riseOffSet: 250
    })
    eventMarker.customId = Math.floor((Math.random() * 100) + 1);
    eventMarker.venueName = eventInformation[i].venue.name.toString();
    eventMarker.eventType = eventInformation[i].EventCode;
    eventMarker.eventName =eventInformation[i].eventname;
    eventMarker.eventLinkText = linkifyjsHtml(eventInformation[i].link);
    // eventMarker.eventLinkURL = linkifyjsHtml(eventLinkText);
    eventMarker.eventImage = eventInformation[i].imageurl;
    eventMarker.price = eventInformation[i].entryprice;
    eventMarker.description = eventInformation[i].description;
    eventMarker.date = eventInformation[i].date;


    eventMarker.addTo(markerLayer).on('click', onMapClick)
    // .bindPopup(`Event: ${eventName} | Venue: ${venueName} | Type: ${eventType} | Link: ${eventLinkURL}`);
    // popup = L.popup({
    //  keepInView: true,
    //  className: "popup"
    // })
    }
  };

  function onMapClick(e) {
    console.log(e);
    PubSub.publish('MapView:pin-click', e.target);

    // popup
    // .setLatLng(e.latlng)
    // .openOn(myMap);
  }

module.exports = MapView;
