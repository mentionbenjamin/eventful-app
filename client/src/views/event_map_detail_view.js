const PubSub = require('../helpers/pub_sub.js');

const EventMapDetailView = function (container) {
  this.container = container;
}


EventMapDetailView.prototype.bindEvents = function () {
  PubSub.subscribe('MapView:pin-click', (event) => {
    this.renderEventDetails(event.detail);
    console.log(event.detail);
  })
}

EventMapDetailView.prototype.renderEventDetails = function (event) {
  this.container.innerHTML = " ";
  console.log("hello");
  const eventName = document.createElement('h4');
    eventName.textContent = `${event.eventName}`;
    this.container.appendChild(eventName);
  const eventType = document.createElement('p');
    eventType.textContent = `${event.eventType}`;
    this.container.appendChild(eventType);

    const description = document.createElement('p');
    description.textContent = `${event.description}`;
    this.container.appendChild(description);
  const price = document.createElement('p');
  price.textContent = `${event.price}`;
  this.container.appendChild(price);

  return this.container;
};

module.exports = EventMapDetailView;
