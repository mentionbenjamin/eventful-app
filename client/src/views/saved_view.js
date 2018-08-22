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

    const favourites = document.getElementById('favourites');

    savedDiv = document.createElement('div');
    savedDiv.id = "saved-items";
    favourites.appendChild(savedDiv);

    console.log(events[i]);
    const eventname = document.createElement('p');
    eventname.textContent = `${events[i].eventname}`;
    savedDiv.appendChild(eventname);

    const eventVenue = document.createElement('p');
    eventVenue.textContent = `Venue: ${events[i].venue.name}`;
    savedDiv.appendChild(eventVenue);


    const entryprice = document.createElement('p');
    entryprice.textContent = `Price: ${events[i].entryprice}`;
    savedDiv.appendChild(entryprice);

    this.createDeleteButton(events[i]._id, savedDiv);

    this.appenedLine(savedDiv);
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

SavedEventView.prototype.appenedLine = function(container){
  const line = document.createElement('hr');
  container.appendChild(line);
};

module.exports = SavedEventView;
