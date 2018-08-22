const PubSub = require('../helpers/pub_sub.js');


const SavedEventView = function(container) {
  this.container = container;
}

SavedEventView.prototype.bindEvents = function(){
  PubSub.subscribe('Events:saved-event-list', (evt) =>{
    const savedEvents = evt.detail;
  //   this.render(savedEvents);

    PubSub.subscribe('EventListView:saved-list-tab-clicked', (evt) =>{
      const favourites = document.getElementById('favourites');
      favourites.innerHTML = ""
      // this.container.innerHTML = " "
      this.render(savedEvents);
    });
  });
}

SavedEventView.prototype.render = function(events){
  for(var i = 0; i< events.length; i++){

    savedDiv = document.createElement('div');
    const favourites = document.getElementById('favourites');

    savedDiv.id = "saved-items";
    favourites.appendChild(savedDiv);

    const eventname = document.createElement('p');
    eventname.textContent = `${events[i].eventname}`;
    eventname.classList.add('list-event-name');
    savedDiv.appendChild(eventname);

    const eventVenue = document.createElement('p');
    eventVenue.textContent = `Venue: ${events[i].venue.name}`;
    savedDiv.appendChild(eventVenue);


    const date = this.createTextElement('p', `${events[i].date}`);
    date.classList.add('list-date');
    savedDiv.appendChild(date);


    const venue = this.createTextElement('p', `${events[i].venue.name}`);
    venue.classList.add('list-venue');
    savedDiv.appendChild(venue);

    this.createDeleteButton(events[i]._id, savedDiv);
  }
  return savedDiv;
};

SavedEventView.prototype.createDeleteButton = function(eventId, container){
  const deleteButton = document.createElement('i');
  deleteButton.classList.add('material-icons');
  deleteButton.innerHTML = 'cancel'
  deleteButton.value = eventId;
  deleteButton.name = 'delete';
  container.appendChild(deleteButton);

  deleteButton.addEventListener('click', (evt) => {
    PubSub.publish('SavedEventView:delete-button-pressed', evt.target.value)
  });
}

SavedEventView.prototype.createTextElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};



module.exports = SavedEventView;
