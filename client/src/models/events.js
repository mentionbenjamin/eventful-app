const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');


const Events = function () {
  this.events = [];
  this.town = null;
  this.newEvents = [];
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
  request.get()
  .then((data) => {
    const url = `http://localhost:3000/events/${data.latt}/${data.longt}/${category}`;
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
    // PubSub.publish('Events:form-data', evt.detail)
    const newEvents = this.getSearchData(evt.detail);

    // console.log(newEvents);
    // PubSub.publish('Events:new-data-loaded', newEvents);
  });
};


module.exports = Events;
