const Events = require('./models/events.js');
const leaflet = require('leaflet');
const MapView = require('./views/map_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const mapContainer = document.querySelector('#map-container');
  const mapView = new MapView(mapContainer);
  mapView.bindEvents();







  const events = new Events();
  events.getData('Edinburgh');
});
