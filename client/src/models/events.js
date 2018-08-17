const RequestHelper = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Events = function () {
  this.events = events;
  this.towns = towns;
}

Events.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://www.skiddle.com/api/v1/events/search/?api_key=ad2b6e3c9f2cbbb0b736f407132c55b7');
  requestHelper.get((data) => {
    this.handleDataReady(data);
    PubSub.publish('Events:events-data-ready', this.events);
  });
};
