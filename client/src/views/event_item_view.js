const PubSub = require('../helpers/pub_sub.js');

const EventItemView = function() {

};

EventItemView.prototype.render = function (event) {
  const eventContainer = document.createElement('div');
  console.log(event);
  eventContainer.id = 'event-item';


  const eventName = this.createTextElement('h4', event.eventname);
  eventContainer.appendChild(eventName);

  const venue = this.createTextElement('p', event.venue.name);
  eventContainer.appendChild(venue);

  const date = this.createTextElement('p', event.date);
  eventContainer.appendChild(date);

  const price = this.createTextElement('p', event.entryprice);
  eventContainer.appendChild(price);

  this.saveEvent(event, eventContainer);

  return eventContainer;
};

EventItemView.prototype.createTextElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

EventItemView.prototype.saveEvent = function (event, container){
  const saveButton = document.createElement('p')
  saveButton.textContent = `I am going to ${event.eventname}!`;
  container.appendChild(saveButton);
  saveButton.addEventListener('click', (evt)=>{
    console.log(evt.detail);
  })
}




module.exports = EventItemView;
