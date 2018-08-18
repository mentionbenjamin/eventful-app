
const MapView = function (container) {
  this.container = container;
}

MapView.prototype.bindEvents = function () {
  const myMap = L.map('mapid', {
    center: [51.505, -0.09],
    zoom: 10
  })
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
};

module.exports = MapView;
