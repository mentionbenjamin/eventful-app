const Events = require('./models/events.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const selectCategory = document.querySelector('select#category');
  const selectView = new SelectView(selectCategory);
  selectView.bindEvents();

  const events = new Events();
  events.getData('Edinburgh');
  // console.log(events.getData('Edinburgh'));
});
