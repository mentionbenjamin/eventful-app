const Events = require('./models/events.js');
const leaflet = require('leaflet');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');


  var myMap = L.map('mapid', {
    center: [51.505, -0.09],
    zoom: 10
  })


  console.log(myMap)



  const events = new Events();
  // events.getData('Edinburgh');
  // console.log(events.getData('Edinburgh'));
});
