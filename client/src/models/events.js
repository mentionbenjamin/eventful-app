const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');


const Events = function () {
  this.events = [];
  this.town = null;
}


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
    console.log(this.events);
    PubSub.publish('Events:event-data-loaded', this.events);
    // console.log(this.events);
  })
  .catch((err) => {
    console.error(err);
  });
}


module.exports = Events;
