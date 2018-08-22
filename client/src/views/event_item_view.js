const PubSub = require('../helpers/pub_sub.js');
const MaterialIcons = require('material-design-icons');

const EventItemView = function() {

};

EventItemView.prototype.render = function (event) {
  const eventValues = [{coordinates:[event.venue.latitude, event.venue.longitude], eventname: event.venue.name, date: event.date, eventprice: event.entryprice, venue: event.venue.name, description:event.description, openingtimes: event.openingtimes, eventCode: event.eventCode}]

  const eventContainer = document.createElement('div');
  eventContainer.id = 'event-item';
  eventContainer.value = eventValues;

  eventContainer.addEventListener('click', (evt) =>{
     console.log(evt.target.value);
     PubSub.publish('EventItemView', evt);
  });

  // const date = this.createTextElement('p', `Date: ${event.date}`);
  // date.classList.add('list-date');
  // eventContainer.appendChild(date);

  const eventName = this.createTextElement('h4', `Event: ${event.eventname}`);
  eventName.value = eventValues;
  eventContainer.appendChild(eventName);
  eventName.addEventListener('click', (evt) =>{
    console.log(evt.target.value);
  });

  const venue = this.createTextElement('p',`Venue: ${event.venue.name}`);
  venue.value = eventValues;
  eventContainer.appendChild(venue);

  const date = this.createTextElement('p', `Date: ${event.date}`);
  eventContainer.appendChild(date);
  date.value = eventValues;

  const price = this.createTextElement('p', `Price: ${event.entryprice}`);
  eventContainer.appendChild(price);
  date.classList.add('list-date');
  price.value = eventValues;

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
  saveButton.classList.add('save-icon');
  saveButton.innerHTML = "S";
  saveButton.value = event;

  container.appendChild(saveButton);
  saveButton.addEventListener('click', (evt)=>{

      const newEvent = {
        eventName: event.eventName,
        description: event.description,
        venue: event.venue,
        date: event.date,
        time: event.time,
        entryprice: event.entryprice,
        lat: event.venue.latitude,
        longt: event.venue.longitude,
        customId: event.customId,
        venueName: event.venueName,
        eventType: event.eventType,
        linkURL:event.linkURL
      }

    PubSub.publish('EventItemView:event-to-save-data', newEvent);
  });
}

module.exports = EventItemView;
