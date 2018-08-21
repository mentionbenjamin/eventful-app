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
  console.log(event);
    this.container.innerHTML = " ";

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add("event-details");

    // Left side of container

    const leftDescriptionContainer = document.createElement('div');
    leftDescriptionContainer.classList.add("left-description-container");
    detailsDiv.appendChild(leftDescriptionContainer);

    const leftTitle = document.createElement('div');
    leftTitle.classList.add("left-title");
    leftTitle.textContent = `${event.eventName}`;
    leftDescriptionContainer.appendChild(leftTitle);

    const leftDescription = document.createElement('div');
    leftDescription.classList.add("left-description");
    leftDescription.textContent = `${event.description}`;
    leftDescriptionContainer.appendChild(leftDescription);

  // Right side of container

    const rightInfoContainer = document.createElement('div');
    rightInfoContainer.classList.add("right-info-container");
    detailsDiv.appendChild(rightInfoContainer);

    const rightInfoParent = document.createElement('div');
    rightInfoParent.classList.add("right-info-parent");
    rightInfoContainer.appendChild(rightInfoParent);

// DATE INFO
    const dateTimeContainer = document.createElement('div');
    dateTimeContainer.classList.add("date-time-container");
    rightInfoParent.appendChild(dateTimeContainer);

    const dateTimeTitle = this.createTextElement('p', "DATE/TIME");
    dateTimeTitle.classList.add("date-time-title");
    dateTimeContainer.appendChild(dateTimeTitle);

    const dateInfo = this.createTextElement('p', event.date);
    const timeInfo = this.createTextElement('p', event.doorsopen);

    dateTimeContainer.appendChild(dateInfo);
    dateTimeContainer.appendChild(timeInfo);


// PRICE INFO
    const entryPriceContainer = document.createElement('div');
    entryPriceContainer.classList.add("entry-price-container");
    rightInfoParent.appendChild(entryPriceContainer);

    const entryPriceTitle = this.createTextElement('p', "ENTRY PRICE");
    entryPriceTitle.classList.add("entry-price-title");
    entryPriceContainer.appendChild(entryPriceTitle);

    const entryPrice = document.createElement('p');
    entryPrice.classList.add("entry-price-info");
    entryPrice.textContent = `${event.price}`;
    entryPriceContainer.appendChild(entryPrice);

// ADDRESS INFO
    const addressContainer = document.createElement('div');
    addressContainer.classList.add("address-container");
    rightInfoParent.appendChild(addressContainer);

    const addressTitle = this.createTextElement('p', "ADDRESS");
    addressTitle.classList.add("address-title");
    addressContainer.appendChild(addressTitle);

    const address = document.createElement('div');
    address.classList.add("address-info");

    const address1 = this.createTextElement('p', event.venue.name );
    const address2 = this.createTextElement('p', event.venue.address );
    const address3 = this.createTextElement('p', event.venue.town );
    const address4 = this.createTextElement('p', event.venue.postcode );

    address.appendChild(address1);
    address.appendChild(address2);
    address.appendChild(address3);
    address.appendChild(address4);

    addressContainer.appendChild(address);

    // BUTTONS

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    const buttonLink = document.createElement('a');
    buttonLink.href= `${event.linkURL}`;
    const ticketsButton = document.createElement('button');
    ticketsButton.classList.add("save-button");
    ticketsButton.textContent = "Tickets";
    buttonLink.appendChild(ticketsButton);
    buttonContainer.appendChild(buttonLink);

    this.saveEvent(event, buttonContainer);

    rightInfoParent.appendChild(buttonContainer);


    const closeIcon = document.createElement('img');
    closeIcon.src = "https://image.flaticon.com/icons/svg/59/59836.svg"
    closeIcon.classList.add("close-icon");
    closeIcon.addEventListener('click', (event) => {
      this.container.innerHTML = " ";
    })
    detailsDiv.appendChild(closeIcon);

    this.container.appendChild(detailsDiv)

  return this.container;
};


EventMapDetailView.prototype.saveEvent = function (event, container){

  const saveButton = document.createElement('button');
  saveButton.classList.add("save-button");
  saveButton.textContent = "Save";
  saveButton.value = event;
  console.log(saveButton.value);
  container.appendChild(saveButton);
  saveButton.addEventListener('click', (evt)=>{

    const newEvent = {
      name: event.eventName,
      venue: event.venue.name,
      date: event.date,
      price: event.price
    }

    PubSub.publish('EventItemView:event-to-save-data', newEvent);
    console.log(newEvent);
  });
  return container;
}

EventMapDetailView.prototype.createTextElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

module.exports = EventMapDetailView;
