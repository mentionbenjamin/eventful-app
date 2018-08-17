const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const ApiKey = require('./api_key.js');

const Events = function () {
  this.events = [];
  this.towns = [];
}

const apiKey = new ApiKey();

console.log(apiKey);

Events.prototype.getData = function () {
  const url = `https://www.skiddle.com/api/v1/events/search/?api_key=${apiKey.apiKey}`;
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
