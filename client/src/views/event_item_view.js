const PubSub = require('../helpers/pub_sub.js');
const MaterialIcons = require('material-design-icons');

const EventItemView = function() {

};

EventItemView.prototype.render = function (event) {
  const eventValues = [{latt:event.venue.latitude, longt: event.venue.longitude, eventname: event.venue.name, date: event.date, entryprice: event.entryprice, venue: event.venue.name, description:event.description, eventCode: event.eventCode, openingtimes: event.openingtimes.doorsopen}]

  const eventContainer = document.createElement('div');
  eventContainer.id = 'event-item';
  eventContainer.value = eventValues;

  eventContainer.addEventListener('click', (evt) =>{
     PubSub.publish('EventItemView', evt.target.value);
  });

  const eventname = this.createTextElement('h4', `${event.eventname}`);
  eventname.value = eventValues;
  eventContainer.appendChild(eventname);
  eventname.addEventListener('click', (evt) =>{
  });

  const date = this.createTextElement('p', `${event.date}`);
  date.classList.add('list-date');
  date.value = eventValues;
  eventContainer.appendChild(date);

  const venue = this.createTextElement('p',`${event.venue.name}`);
  venue.classList.add('list-venue');
  venue.value = eventValues;
  eventContainer.appendChild(venue);

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
        eventname: event.eventname,
        description: event.description,
        venue: event.venue,
        date: event.date,
        time: event.time,
        entryprice: event.entryprice,
        latt: event.venue.latitude,
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
