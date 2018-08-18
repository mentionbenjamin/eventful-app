const PubSub = require('../helpers/pub_sub.js');

const EventItemView = function() {

};

EventItemView.prototype.render = function (event) {
  const eventContainer = document.createElement('div');
  eventContainer.id = 'event-item';

  const eventName = this.createTextElement('h4', event.eventname);
  eventContainer.appendChild(eventName);

  const venue = this.createTextElement('p', event.venue.name);
  eventContainer.appendChild(venue);

  const date = this.createTextElement('p', event.date);
  eventContainer.appendChild(date);

  const price = this.createTextElement('p', event.entryprice);
  eventContainer.appendChild(price);

  return eventContainer;
};

EventItemView.prototype.createTextElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};


module.exports = EventItemView;
