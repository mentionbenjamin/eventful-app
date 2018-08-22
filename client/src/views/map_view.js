const PubSub = require('../helpers/pub_sub.js');
const linkifyjsHtml = require('linkifyjs/html');
const MapView = function (container) {
  this.container = container;
  this.clickedMarkerLayer = null;

}


MapView.prototype.bindEvents = function () {

  PubSub.subscribe('Events:event-data-loaded', (evt) => {
   this.createMap(evt.detail);
   this.setMapMarkers(evt.detail);
  });

  PubSub.subscribe('EventItemView', (evt) => {
     this.setMapMarkersClicked(evt)
  });



  PubSub.subscribe('Events:saved-event-list', (evt) =>{
   this.setMapMarkersSaved(evt.detail);
   console.log(evt.detail);
  });
}

  MapView.prototype.createMap = function (eventData) {
    document.getElementById('map-container').innerHTML = "<div id ='mapid'></div>"
    const latt = eventData[0].venue.latitude;
    const longt = eventData[0].venue.longitude;
    myMap = L.map('mapid', {
    center: [54.297293, -1.296386],
    zoom: 10
  }).flyTo([latt, longt], 11, true, 6);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  };

  MapView.prototype.setMapMarkers = function (eventData) {


    const eventInformation = eventData;
    for(var i = 0; i <eventInformation.length; i++){
    const markerLayer =  L.layerGroup().addTo(myMap);
    const venueLat = eventInformation[i].venue.latitude;
    const venueLongt = eventInformation[i].venue.longitude;
        const newMarker = L.marker([venueLat, venueLongt],{
      opacity: 1,
      riseOnHover: true,
      riseOffSet: 250
    })
        newMarker.customId = Math.floor((Math.random() * 100) + 1);
        newMarker.venue = eventInformation[i].venue;
        newMarker.eventType = eventInformation[i].EventCode;
        newMarker.eventname =eventInformation[i].eventname;
        newMarker.linkURL  = eventInformation[i].link;
        newMarker.entryprice = eventInformation[i].entryprice;
        newMarker.description = eventInformation[i].description;
        newMarker.date = eventInformation[i].date;
        newMarker.time = eventInformation[i].openingtimes;



        newMarker.addTo(markerLayer).on('click', onMapClick)
            newMarker.bindPopup(`Event: ${newMarker.eventname} | click for full details`);
        newMarker.on('mouseover', function(e){
      this.openPopup();
    });
        newMarker.on('mouseout', function(e){
      this.closePopup();
    });
    }
  };
MapView.prototype.setMapMarkersClicked  = function (eventData){

  if (this.clickedMarkerLayer != null ) {
    myMap.removeLayer(this.clickedMarkerLayer);
  };
  this.clickedMarkerLayer =  L.layerGroup().addTo(myMap);

  const redIcon = new L.Icon({
    iconUrl: 'img/marker-icon-2x-red.png',
    iconSize: [27, 43],
    iconAnchor: [14, 41],
    popupAnchor: [1, -34],
  });

  const newMarker = L.marker([eventData.detail[0].latt, eventData.detail[0].longt],{
  icon: redIcon,
  opacity: 1,
  riseOnHover: true,
  riseOffSet: 250
})

    newMarker.customId = Math.floor((Math.random() * 100) + 1);
    newMarker.venue = eventData.detail[0].venue;
    newMarker.eventType = eventData.detail[0].EventCode;
    newMarker.eventname =eventData.detail[0].eventname;
    newMarker.linkURL  = eventData.detail[0].link;
    newMarker.entryprice = eventData.detail[0].entryprice;
    newMarker.description = eventData.detail[0].description;
    newMarker.date = eventData.detail[0].date;
    newMarker.time = eventData.detail[0].openingtimes;
    newMarker.link = eventData.detail[0].link;

  newMarker.addTo(this.clickedMarkerLayer).on('click', onMapClick)
 };

  MapView.prototype.setMapMarkersSaved = function (eventData) {
    const eventInformation = eventData;
    for(var i = 0; i <eventInformation.length; i++){
    const savedMarkerLayer =  L.layerGroup().addTo(myMap);
    console.log(eventInformation[i]);
    const venueLat = eventInformation[i].latt;
    const venueLongt = eventInformation[i].longt;

    const violetIcon = new L.Icon({
    	iconUrl: 'img/marker-icon-violet.png',
    	shadowUrl: 'img/marker-shadow.png',
    	iconSize: [25, 41],
    	iconAnchor: [12, 41],
    	popupAnchor: [1, -34],
    	shadowSize: [41, 41]
    });
    const savedEventMarker = L.marker([venueLat, venueLongt],{
      icon: violetIcon,
      opacity: 1,
      riseOnHover: true,
      riseOffSet: 250
    })
    savedEventMarker.customId = eventInformation[i]._id;
    savedEventMarker.venue = eventInformation[i].venue;

    savedEventMarker.eventType = eventInformation[i].EventCode;
    savedEventMarker.eventname =eventInformation[i].eventname;
    savedEventMarker.linkURL  = eventInformation[i].link;
    savedEventMarker.entryprice = eventInformation[i].entryprice;
    savedEventMarker.description = eventInformation[i].description;
    savedEventMarker.date = eventInformation[i].date;
    savedEventMarker.time = eventInformation[i].openingtimes;


    savedEventMarker.addTo(savedMarkerLayer).on('click', onMapClick)
    }
  };


  function onMapClick(e) {
    PubSub.publish('MapView:pin-click', e.target);
  }

module.exports = MapView;
