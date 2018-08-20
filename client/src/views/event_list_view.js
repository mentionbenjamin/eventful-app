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
    // PubSub.publish('Events:events-length', items.length);
  });
};

EventListView.prototype.renderList = function(items) {
  this.emptyList();
  eventsLength = items.length;
  const eventCounter = document.createElement("h1");
  const resultsTab = document.createElement("button");
  resultsTab.setAttribute("id", "results");
  resultsTab.innerHTML = "Results";
  const savedTab = document.createElement("button");
  savedTab.setAttribute("id", "favourites");
  savedTab.innerHTML = "Saved";
  resultsTab.addEventListener('click', () => {
    resultsTab.innerHTML = "Switched";
  })
  const listDiv = document.createElement("div");
  eventCounter.textContent = `${eventsLength} events found`;
  this.container.appendChild(resultsTab);
  this.container.appendChild(savedTab);
  listDiv.appendChild(eventCounter);
  items.forEach((item) => {
    const eventSearchResult = this.renderItem(item);
    listDiv.appendChild(eventSearchResult);
  });
  this.container.appendChild(listDiv);
};

EventListView.prototype.emptyList = function(items) {
  this.container.innerHTML = '';
};

EventListView.prototype.renderItem = function(item) {
  const eventItemView = new EventItemView();
  const eventItem = eventItemView.render(item);
  return eventItem;
};

function switchTabs (tab) {
  tab.innerHTML = "Switched";
}
module.exports = EventListView;
