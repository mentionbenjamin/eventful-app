const PubSub = require('../helpers/pub_sub.js');
const Cities = require('../models/uk_cities.js');
const cities = new Cities();

const SelectView = function (element) {
  this.element = element;
};

SelectView.prototype.bindEvents = function () {
  this.populateSelect();
  this.populateCityList(cities.cityList);
  PubSub.subscribe('Events:event-data-loaded', (evt) => {
    const events = evt.detail;

  })
  this.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const category = event.target['category'].value;
    const location = event.target['location'].value;
    const mindate = event.target['mindate'].value;
    const maxdate = event.target['maxdate'].value;
    data = this.createData(category, location, mindate, maxdate);
    document.getElementById('form').id = 'new-form';

    sentenceTexts = document.getElementsByClassName('sentence-text');
    for (sentence of sentenceTexts) {
      sentence.style.fontSize = "30px";
    };

    eventsDropdown = document.getElementsByClassName('custom-select');
    for (dropdown of eventsDropdown) {
      dropdown.style.width = "157px";
      dropdown.style.fontSize = "30px";
    };



    PubSub.publish('SelectView:form-input-submitted', data);

  })
};

SelectView.prototype.populateSelect = function () {
  const categorySelect = document.querySelector('select#category');

  const categories = [ {name: "Live Music", value: "LIVE" }, {name: "Festivals", value: "FEST" }, {name: "Comedy", value: "COMEDY" }, {name: "Theatre", value: "THEATRE" }, {name: "Exhibitions", value: "EXHIB" }];

  categories.forEach((category) => {
    const option = this.createOption(category);
    categorySelect.appendChild(option);
  });
};

SelectView.prototype.createOption = function (category) {
  const option = document.createElement('option');
  option.textContent = category.name;
  option.value = category.value;
  return option;
};


SelectView.prototype.populateCityList = function (cities) {
  cities.forEach(function(city){
  const option = document.createElement('option');
  option.value = city;
  const cityList = document.querySelector('#cities');
  cityList.appendChild(option)
  });

  //
  //
  // const list = document.getElementById('cities');
  //
  // cities.cityList.forEach(function(item){
  //   const option = document.createElement('option');
  //   option.value = item;
  //   cityList.appendChild(option);
  // });




};

SelectView.prototype.createData = function (category, location, mindate, maxdate) {
  return {
    category: category,
    location: location,
    mindate: mindate,
    maxdate: maxdate
  };
};







// ANY PLACE - START

// console.log(cities.cityList);
//
//      const list = document.getElementById('cities');
//
//      cities.cityList.forEach(function(item){
//        const option = document.createElement('option');
//        option.value = item;
//        cityList.appendChild(option);
//      });


// FORM LOCATION - END














module.exports = SelectView;
