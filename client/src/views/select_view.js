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
    console.log(events);

  })
  this.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const category = event.target['category'].value;
    const location = event.target['location'].value;
    const mindate = event.target['mindate'].value;
    const maxdate = event.target['maxdate'].value;
    data = this.createData(category, location, mindate, maxdate);
    if (document.getElementById('form') != null){
      document.getElementById('form').id = 'new-form';
    }
    // sentence words
    sentenceTexts = document.getElementsByClassName('sentence-text');
    for (sentence of sentenceTexts) {
      sentence.style.fontSize = "30px";
    };
    // events dropdown
    eventsDropdown = document.getElementsByClassName('custom-select');
    for (dropdown of eventsDropdown) {
      dropdown.style.width = "157px";
      dropdown.style.fontSize = "30px";
    };
    // mindate & maxdate
    minDateStyle = document.getElementsByClassName('form-min-date');
    minDateStyle[0].style.width = "171px";
    minDateStyle[0].style.fontSize = "30px";
    minDateStyle[0].style.paddingLeft = "0px";
    minDateStyle[0].style.textAlign = "left";
    maxDateStyle = document.getElementsByClassName('form-max-date');
    maxDateStyle[0].style.width ="171px";
    maxDateStyle[0].style.fontSize = "30px";
    maxDateStyle[0].style.paddingLeft = "16px";
    maxDateStyle[0].style.paddingTop = "-10px";
    maxDateStyle[0].style.textAlign = "left";
    // location search
    formLocation = document.getElementsByClassName('form-location');
    formLocation[0].style.width = "250px";
    formLocation[0].style.fontSize = "30px";
    formLocation[0].style.paddingLeft = "14px";

    saveContainer = document.getElementsByClassName('save-container');
    saveContainer[0].style.float = "right";


    eventContainer = document.getElementsByClassName('event-container');

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
