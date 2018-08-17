const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
};



SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Events:event-data-loaded', (evt) => {
    const eventCategories = evt.detail;
    console.log(evt.detail);
    const categoryNames = this.getCategoryNames(evt.detail);
    console.log(categoryNames);
    this.populate(categoryNames);
  });

  this.element.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

// SelectView.prototype.populate = function (events) {
//   events.forEach((event, index) => {
//     const option = document.createElement('option');
//     option.textContent = event.EventCode;
//     option.value = index;
//     this.element.appendChild(option);
//   });
// };

SelectView.prototype.populate = function (categories) {
  for (category of categories) {
    const option = document.createElement('option');
    option.textContent = category;
    this.element.appendChild(option);
  }
};

SelectView.prototype.getCategoryNames = function (events) {
  return events
    .map(event => event.EventCode)
    .filter((category, index, categories) => categories.indexOf(category) === index);
};

module.exports = SelectView;
