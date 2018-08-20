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

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add("eventDetails");
    detailsDiv.innerHTML = " ";
    
    const eventName = document.createElement('h4');
    eventName.textContent = `${event.eventName}`;
    detailsDiv.appendChild(eventName);

    const eventType = document.createElement('p');
    eventType.textContent = `${event.eventType}`;
    detailsDiv.appendChild(eventType);

    const date = document.createElement('p');
    date.textContent = `${event.date}`;
    detailsDiv.appendChild(date);

    const description = document.createElement('p');
    description.textContent = `${event.description}`;
    detailsDiv.appendChild(description);

    const price = document.createElement('p');
    price.textContent = `${event.price}`;
    detailsDiv.appendChild(price);

    const link = document.createElement('a');
    link.textContent = "Buy tickets here";
    link.href = `${event.linkURL}`;
    detailsDiv.appendChild(link);

    this.container.appendChild(detailsDiv)

  return this.container;
};

module.exports = EventMapDetailView;
