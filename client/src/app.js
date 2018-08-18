const Events = require('./models/events.js');
const SelectView = require('./views/select_view.js');
const leaflet = require('leaflet');
const MapView = require('./views/map_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const form = document.querySelector('#event-form');
  const selectView = new SelectView(form);
  selectView.bindEvents();

  const events = new Events();
<<<<<<< HEAD
  events.getData('Liverpool');
=======
  events.getData('Manchester');
  events.bindEvents();
>>>>>>> develop
  // events.getFormData();
  // console.log(events.getData('Edinburgh'));

  const mapContainer = document.querySelector('#map-container');
  const mapView = new MapView(mapContainer);
  mapView.bindEvents();

});
