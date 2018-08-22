const PubSub = require('../helpers/pub_sub.js');
const MaterialIcons = require('material-design-icons');

const EventItemView = function() {

};

EventItemView.prototype.render = function (event) {
  const eventContainer = document.createElement('div');
  console.log(event);
  eventContainer.id = 'event-item';
  eventContainer.value = [[event.venue.latitude, event.venue.longitude],event.venue.name,event.date,event.price]

  eventContainer.addEventListener('click', (evt) =>{
     console.log(evt.target.value);
     PubSub.publish('EventItemView', evt);
  });


  const eventName = this.createTextElement('h4', `Event: ${event.eventname}`);
  eventName.value = [[event.venue.latitude, event.venue.longitude],event.venue.name,event.date,event.price]
  eventContainer.appendChild(eventName);
  eventName.addEventListener('click', (evt) =>{
    console.log(evt.target.value);
  });

  const venue = this.createTextElement('p',`Venue: ${event.venue.name}`);
  venue.value = [[event.venue.latitude, event.venue.longitude],event.venue.name,event.date,event.price]
  eventContainer.appendChild(venue);

  const date = this.createTextElement('p', `Date: ${event.date}`);
  eventContainer.appendChild(date);
  date.value = [[event.venue.latitude, event.venue.longitude],event.venue.name,event.date,event.price]

  const price = this.createTextElement('p', `Price: ${event.entryprice}`);
  eventContainer.appendChild(price);
  price.value = [[event.venue.latitude, event.venue.longitude],event.venue.name,event.date,event.price]

  this.saveEvent(event, eventContainer);

  return eventContainer;
};

EventItemView.prototype.createTextElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

EventItemView.prototype.saveEvent = function (event, container){
  const saveButton = document.createElement('i')
  saveButton.classList.add('material-icons');
  saveButton.innerHTML = "star-rate";
  saveButton.value = event;

  container.appendChild(saveButton);
  saveButton.addEventListener('click', (evt)=>{

    const newEvent = {
      name: event.eventname,
      venue: event.venue.name,
      date: event.date,
      price: event.entryprice,
      lat: event.venue.latitude,
      longt: event.venue.longitude
    }

    PubSub.publish('EventItemView:event-to-save-data', newEvent);
  });
}

module.exports = EventItemView;
