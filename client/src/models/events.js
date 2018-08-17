const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Events = function () {
  this.events = [];
  this.towns = [];
}

Events.prototype.getData = function () {
  const url = 'https://www.skiddle.com/api/v1/events/search/?api_key=ad2b6e3c9f2cbbb0b736f407132c55b7';
  const request = new Request(url);
  request.get()
    .then((data) => {
      this.events = data;
      PubSub.publish('Events:event-data-loaded', this.events);
    })
     .catch((err) => {
      console.error(err);
    });

}

module.exports = Events;
