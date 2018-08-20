const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const SavedEventView = require('../views/saved_view.js');


const Events = function () {
  this.events = [];
  this.town = null;
  this.newEvents = [];
  this.url = 'http://localhost:3000/api/saved-events'
}

// receiving the two API's
Events.prototype.getData = function (townName) {
  const url = `https://geocode.xyz/${townName},UK?json=1`;
  const request = new Request(url);
  request.get()
  .then((data) => {
    const url = `http://localhost:3000/events/${data.latt}/${data.longt}`;
    const request = new Request(url);
    return request.get();

  })
  .then((data) => {
    this.events = data.results;
    PubSub.publish('Events:event-data-loaded', this.events);
  })
  .catch((err) => {
    console.error(err);
  });
}

Events.prototype.getSearchData = function (criteria) {
  const url = `https://geocode.xyz/${criteria.location},UK?json=1`;
  const request = new Request(url);
  const category = criteria.category;
  const mindate = criteria.mindate;
  const maxdate = criteria.maxdate;
  request.get()
  .then((data) => {
    const url = `http://localhost:3000/events/${data.latt}/${data.longt}/${category}/${mindate}/${maxdate}`;
    const request = new Request(url);
    return request.get();

  })
  .then((data) => {
    this.newEvents = data.results;
    PubSub.publish('Events:event-data-loaded', this.newEvents);
  })
  .catch((err) => {
    console.error(err);
  });
}

// subscribing from SelectView to the data the user inputted in the form
Events.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:form-input-submitted', (evt) => {
    const newEvents = this.getSearchData(evt.detail);
  });

  PubSub.subscribe('EventItemView:event-to-save-data', (evt) =>{
    const eventToSave = evt.detail;
    this.saveNewEvent(eventToSave);
  })

  PubSub.subscribe('SavedEventView:delete-button-pressed', (evt) =>{

    this.deleteEvent(evt.detail);
    console.log(evt.detail);
  });
};

Events.prototype.getSavedData = function() {
  const request = new Request(this.url);
  request.get()
  .then((events) =>{
    PubSub.publish('Events:saved-event-list', events);
  })
}

Events.prototype.saveNewEvent = function (eventDetails) {
  const request = new Request(this.url);
  request.post(eventDetails)
  .then((events) => {
    PubSub.publish('Events:saved-event-list', events);
  })
  .catch(console.error);
};

Events.prototype.deleteEvent = function (eventId) {
  const request = new Request(this.url);
  // const savedView = new SavedEventView(this.newEvents);
  // savedView.render();
  request.delete(eventId)
  .then((events)=> {
    PubSub.publish('Events:saved-event-list', events);
  })
  .catch(console.error);
};


module.exports = Events;
