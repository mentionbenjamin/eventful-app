const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Events:event-data-loaded', (evt) => {
    const events = evt.detail;
    // const categoryNames = this.getCategoryNames(events);
    // this.populate(categoryNames);
  })
  this.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const category = event.target['category'].value;
    const location = event.target['location'].value;
    const mindate = event.target['mindate'].value;
    const maxdate = event.target['maxdate'].value;
    data = this.createData(category, location, mindate, maxdate);
    PubSub.publish('SelectView:form-input-submitted', data);

  })
};

// SelectView.prototype.populate = function (categories) {
//   for (category of categories) {
//     const option = document.createElement('option');
//     option.textContent = category;
//     const categorySelect = document.querySelector('#category');
//     categorySelect.appendChild(option);
//   }
// };

SelectView.prototype.getCategoryNames = function (events) {
  return events
    .map(event => event.EventCode)
    .filter((category, index, categories) => categories.indexOf(category) === index);
};

SelectView.prototype.createData = function (category, location, mindate, maxdate) {
  return {
    category: category,
    location: location,
    mindate: mindate,
    maxdate: maxdate
  };
};

module.exports = SelectView;
