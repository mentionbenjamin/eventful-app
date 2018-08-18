const PubSub = require('../helpers/pub_sub.js');
const EventItemView = require('./event_item_view.js');

const EventListView = function(container) {
  this.container = container;
};

EventListView.prototype.bindEvents = function() {
  PubSub.subscribe('Events:event-data-loaded', (evt) => {
    const items = evt.detail;
    this.renderList(items);
  });
};

EventListView.prototype.renderList = function(items) {
  this.emptyList();
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

module.exports = EventListView;
