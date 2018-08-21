const Events = require('./models/events.js');
const SelectView = require('./views/select_view.js');
const leaflet = require('leaflet');
const MapView = require('./views/map_view.js');
const EventListView = require('./views/event_list_view.js');
const EventMapDetailView = require('./views/event_map_detail_view.js');
const SavedEventView = require('./views/saved_view.js');



document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const form = document.querySelector('#form');
  const selectView = new SelectView(form);
  selectView.bindEvents();

  const eventListPanel = document.querySelector('#list-panel');
  const eventListView = new EventListView(eventListPanel);
  eventListView.bindEvents();

  const mapContainer = document.querySelector('#map-container');
  const mapView = new MapView(mapContainer);
  mapView.bindEvents();

  const mapDetailContainer = document.querySelector('#event-details-container');
  const mapDetailView = new EventMapDetailView( mapDetailContainer);
  mapDetailView.bindEvents();

  const savedEventContainer = document.querySelector('#saved-events');
  const savedEventView = new SavedEventView(savedEventContainer);
  savedEventView.bindEvents();

  const events = new Events();

  // events.getData('Manchester');
  events.bindEvents();
  // events.getSavedData();

});
