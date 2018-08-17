const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const ApiKey = require('./api_key.js');
const apiKey = new ApiKey();

const Events = function () {
  this.events = [];
  this.town = null;
}


Events.prototype.getData = function (townName) {
  const url = `https://geocode.xyz/${townName},UK?json=1`;
  const request = new Request(url);
  request.get()
<<<<<<< HEAD
    .then((data) => {
       const url = `https://www.skiddle.com/api/v1/events/search/?api_key=${apiKey.apiKey}&limit=100&eventcode=LIVE&order=goingto&latitude=${data.latt}&longitude=${data.longt}&radius=10`;
       const request = new Request(url);
       return request.get();
    })
    .then((data) => {
      this.events = data.results;
      PubSub.publish('Events:event-data-loaded', this.events);
    })
   .catch((err) => {
     console.error(err);
=======
  .then((data) => {
    const url = `https://www.skiddle.com/api/v1/events/search/?api_key=${apiKey.apiKey}&limit=100&eventcode=LIVE&order=goingto&latitude=${data.latt}&longitude=${data.longt}&radius=10`;
    const request = new Request(url);
    return request.get();

  })
  .then((data) => {
    this.events = data.results;

    PubSub.publish('Events:event-data-loaded', this.events);
    // console.log(this.events);
  })
  .catch((err) => {
    console.error(err);
>>>>>>> 501c9e8cdf277349057ea4d2416247ff17c3a516
  });
}


<<<<<<< HEAD


=======
>>>>>>> 501c9e8cdf277349057ea4d2416247ff17c3a516
module.exports = Events;
