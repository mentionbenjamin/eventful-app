const PubSub = require('../helpers/pub_sub.js');
const EventItemView = require('event_item_view.js');

const EventListView = function(listItem) {
  this.element = listItem;
};

ListView.prototype.setupEventListeners = function() {
  this.element.addEventListener('submit', function(evt) {
    evt.preventDefault();
  });
  PubSub.subscribe('Events:form-submitted', (evt) => {
    const items = evt.detail;
    this.renderList(items);
  });
};

ListView.prototype.renderList = function(items) {
  this.emptyList();
  items.forEach((item) => this.renderItem(item));
};

ListView.prototype.emptyList = function(items) {
  this.element.innerHTML = '';
};

ListView.prototype.renderItem = function(item) {
  const eventItemView = new EventItemView(item);
  const li = eventItemView.createLi();
  this.element.appendChild(li);
};

module.exports = ListView;
