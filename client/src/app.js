const Events = require('./models/events.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const form = document.querySelector('#event-form');
  const selectView = new SelectView(form);
  selectView.bindEvents();

  const events = new Events();
  events.getData('Edinburgh');
  // events.getFormData();
  // console.log(events.getData('Edinburgh'));
});
