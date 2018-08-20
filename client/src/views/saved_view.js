const PubSub = require('../helpers/pub_sub.js');


const SavedEventView = function(container) {
  this.container = container;
}

SavedEventView.prototype.bindEvents = function(){
  PubSub.subscribe('Events:saved-event-list', (evt) =>{
    const savedEvents = evt.detail;
    console.log(savedEvents);
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

  }
  return this.container;
};

module.exports = SavedEventView;
