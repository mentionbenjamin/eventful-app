const PubSub = require('../helpers/pub_sub.js');


const SavedEventView = function(container) {
  this.container = container;
}

SavedEventView.prototype.bindEvents = function(){
  PubSub.subscribe('Events:saved-event-list', (evt) =>{
    const savedEvents = evt.detail;
    console.log(savedEvents);
    this.container.innerHTML = " ";
    this.render(savedEvents);
  });
}

SavedEventView.prototype.render = function(events){
  for(var i = 0; i< events.length; i++){

    const eventTitle = document.createElement('p');
    eventTitle.textContent = events[i].name;
    this.container.appendChild(eventTitle);

    const eventVenue = document.createElement('p');
    eventVenue.textContent = events[i].venue;
    this.container.appendChild(eventVenue);


    const eventPrice = document.createElement('p');
    eventPrice.textContent = events[i].price;
    this.container.appendChild(eventPrice);

    this.createDeleteButton(events[i]._id, this.container);
  }
  return this.container;
};

SavedEventView.prototype.createDeleteButton = function(eventId, container){
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.value = eventId;
  deleteButton.name = 'delete';
  container.appendChild(deleteButton);

  deleteButton.addEventListener('click', (evt) => {
    PubSub.publish('SavedEventView:delete-button-pressed', evt.target.value)
    console.log(evt.target.value);

  });
}

module.exports = SavedEventView;
