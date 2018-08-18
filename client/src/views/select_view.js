const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
};


//
// SelectView.prototype.bindEvents = function () {
//   PubSub.subscribe('Events:event-data-loaded', (evt) => {
//     const events = evt.detail;
//     const categoryNames = this.getCategoryNames(evt.detail);
//     this.populate(categoryNames);
//   });
//
//   this.element.addEventListener('change', (evt) => {
//     const selectedIndex = evt.target.value;
//     PubSub.publish('SelectView:change', selectedIndex);
//     console.log(selectedIndex);
//   });
// };

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Events:event-data-loaded', (evt) => {
    const events = evt.detail;
    const categoryNames = this.getCategoryNames(events);
    this.populate(categoryNames);
  })
  this.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const category = event.target['category'].value;
    console.log(category);
    // const data = evt.target;
    // PubSub.publish('Form:submitted', data);
    // console.log(data);
  })
};

SelectView.prototype.populate = function (categories) {
  for (category of categories) {
    const option = document.createElement('option');
    option.textContent = category;
    const categorySelect = document.querySelector('#category');
    categorySelect.appendChild(option);
  }
};

SelectView.prototype.getCategoryNames = function (events) {
  return events
    .map(event => event.EventCode)
    .filter((category, index, categories) => categories.indexOf(category) === index);
};

// SelectView.prototype.createData = function (form) {
//   return {
//     category: form.category.value,
//     location: form.location.value
//   };
// };

module.exports = SelectView;
