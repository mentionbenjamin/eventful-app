const PubSub = require('../helpers/pub_sub.js');

const EventMapDetailView = function (container) {
  this.container = container;
}


EventMapDetailView.prototype.bindEvents = function () {

  PubSub.subscribe('MapView:pin-click', (event) => {
    this.renderEventDetails(event.detail);
    console.log(event.detail);
  })
  PubSub.subscribe('EventListView: selected-event-clicked', (evt)=>{
    this.renderEventDetails(evt.detail);
  });
}

EventMapDetailView.prototype.renderEventDetails = function (event) {
    this.container.innerHTML = " ";

    const detailsDiv = document.createElement('div');
    detailsDiv.id = "event-details";

    const leftDescriptionContainer = document.createElement('div');
    leftDescriptionContainer.classList.add("left-description-container");
    detailsDiv.appendChild(leftDescriptionContainer);

    const leftTitle = document.createElement('div');
    leftTitle.classList.add("left-title");
    leftDescriptionContainer.appendChild(leftTitle);

    const leftDescription = document.createElement('div');
    leftDescription.classList.add("left-title");
    leftDescriptionContainer.appendChild(leftDescription);

    const eventName = document.createElement('h4');
    eventName.textContent = `${event.eventName}`;
    leftTitle.appendChild(eventName);

    const eventType = document.createElement('p');
    eventType.textContent = `${event.eventType}`;
    detailsDiv.appendChild(eventType);

    const date = document.createElement('p');
    date.textContent = `${event.date}`;
    detailsDiv.appendChild(date);

    const description = document.createElement('p');
    description.textContent = `${event.description}`;
    leftDescription.appendChild(description);

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
