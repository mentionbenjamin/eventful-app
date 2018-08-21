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
    rightInfoContainer.appendChild(rightInfoContainer);

    const dateTimeContainer = document.createElement('div');
    dateTimeContainer.classList.add("date-time-container");
    rightInfoParent.appendChild(dateTimeContainer);

    const dateTimeTitle = document.createElement('span');
    dateTimeTitle.classList.add("date-time-title");
    dateTimeTitle.textContent = "DATE/TIME";
    dateTimeContainer.appendChild(dateTimeTitle);

    const dateTimeInfo = document.createElement('span');
    dateTimeInfo.textContent = `${event.date} ${event.openingtimes.doorsopen}`;
    dateTimeContainer.appendChild(dateTimeInfo);

    const entryPriceContainer = document.createElement('div');
    entryPriceContainer.classList.add("entry-price-container");
    rightInfoParent.appendChild(entryPriceContainer);

    const entryPriceTitle = document.createElement('span');
    entryPriceTitle.classList.add("entry-price-title");
    entryPriceTitle.textContent = "ENTRY PRICE";
    entryPriceContainer.appendChild(entryPriceTitle);

    const entryPrice = document.createElement('span');
    entryPrice.classList.add("entry-price-info");
    entryPrice.textContent = `${event.price}`;
    entryPriceContainer.appendChild(entryPrice);

    const addressContainer = document.createElement('div');
    addressContainer.classList.add("address-container");
    rightInfoParent.appendChild(addressContainer);

    const addressTitle = document.createElement('span');
    entryPriceTitle.classList.add("address-title");
    entryPriceTitle.textContent = "ADDRESS";
    addressContainer.appendChild(entryPriceTitle);

    const address = document.createElement('span');
    address.classList.add("address-info");
    address.textContent = `${event.venue.name}${event.venue.address}${event.venue.town}${event.venue.postcode}`;
    addressContainer.appendChild(address);

    const saveContainer = document.createElement('div');
    const ticketsButton = document.createElement('button');
    ticketsButton.classList.add("save-button");
    ticketsButton.onClick = `location.href=${event.linkURL}`
    ticketsButton.textContent = "Tickets";
    saveContainer.appendChild(ticketsButton);

    this.saveEvent(event, saveContainer);
    // const saveButton = document.createElement('button');
    //
    // saveButton.classList.add("save-button");
    // saveButton.textContent = "Save";
    // saveContainer.appendChild(saveButton);



    this.container.appendChild(detailsDiv)

  return this.container;
};

module.exports = EventMapDetailView;
