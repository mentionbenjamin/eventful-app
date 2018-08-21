const PubSub = require('../helpers/pub_sub.js');
const EventItemView = require('./event_item_view.js');

const EventListView = function(container) {
  this.container = container;
};

EventListView.prototype.bindEvents = function() {
  PubSub.subscribe('Events:event-data-loaded', (evt) => {
    const items = evt.detail;
    this.renderList(items);
    console.log(items.length);
    animateValue("eventCounter", 0, items.length, 2000);
    // PubSub.publish('Events:events-length', items.length);
  });
};

EventListView.prototype.renderList = function(items) {
  this.emptyList();
  const eventsLength = items.length;
  const eventCounter = document.createElement("h1");
  eventCounter.id = "eventCounter";
  const resultsTab = document.createElement("button");
  resultsTab.innerHTML = "Results";
  const savedTab = document.createElement("button");
  savedTab.innerHTML = "Saved";
  eventCounter.textContent = `${eventsLength} events found`;
  this.container.appendChild(resultsTab);
  this.container.appendChild(savedTab);
  this.container.appendChild(eventCounter);
  items.forEach((item) => {
    const eventSearchResult = this.renderItem(item);
    this.container.appendChild(eventSearchResult);
  });
};

EventListView.prototype.emptyList = function(items) {
  this.container.innerHTML = '';
};

EventListView.prototype.renderItem = function(item) {
  const eventItemView = new EventItemView();
  const eventItem = eventItemView.render(item);
  return eventItem;
};



function animateValue(id, start, end, duration) {
    const range = end - start;
    const current = start;
    const increment = end > start? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const obj = document.getElementById(id);
    const timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}


module.exports = EventListView;
