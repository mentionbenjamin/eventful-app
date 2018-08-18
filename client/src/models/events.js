const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');


const Events = function () {
  this.events = [];
  this.town = null;
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
    // console.log(this.events);
    PubSub.publish('Events:event-data-loaded', this.events);
    // console.log(this.events);
  })
  .catch((err) => {
    console.error(err);
  });
}

// subscribing from SelectView to the data the user inputted in the form
Events.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:form-input-submitted', (evt) => {

    console.log(evt.detail);
    PubSub.publish('Events:event-results', event);
  });
};

// converted users inputs into matching events from API
Events.prototype.postForm = function (event) {
  console.log(event);
  this.request.post(event)
    .then((event) => {
      PubSub.publish('Events:event-results', event);
    })
    .catch(console.error);
};






module.exports = Events;
