const Events = require('./models/events.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');


  const events = new Events();
  events.getData('Edinburgh');
});
