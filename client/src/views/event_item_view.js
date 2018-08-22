const PubSub = require('../helpers/pub_sub.js');
const MaterialIcons = require('material-design-icons');

const EventItemView = function() {

};

EventItemView.prototype.render = function (event) {
  const eventContainer = document.createElement('div');
  eventContainer.id = 'event-item';
  eventContainer.addEventListener('click', (event) =>{
     console.log(event.target.innerHTML);
  });

  const date = this.createTextElement('p', `${event.date}`);
  date.classList.add('list-date');
  eventContainer.appendChild(date);

  const eventName = this.createTextElement('p', `${event.eventname}`);
  eventName.classList.add('list-event-name');
  eventContainer.appendChild(eventName);

  const venue = this.createTextElement('p',`${event.venue.name}`);
  venue.classList.add('list-venue');
  eventContainer.appendChild(venue);

  const date = this.createTextElement('p', `Date: ${event.date}`);
  eventContainer.appendChild(date);

  const entryprice = this.createTextElement('p', `Price: ${event.entryprice}`);
  eventContainer.appendChild(entryprice);

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
