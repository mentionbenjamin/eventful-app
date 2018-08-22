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

    styleSentences('sentence-text');
    styleDropDown('custom-select');
    styleMinDate('form-min-date');
    styleMaxDate('form-max-date');
    styleLocation('form-location');
    styleSaveContainer('save-container');

    PubSub.publish('SelectView:form-input-submitted', data);

  })

};

function styleSentences (sentenceClass) {
  sentenceTexts = document.getElementsByClassName(sentenceClass);
  for (sentence of sentenceTexts) {
    sentence.style.fontSize = "1.4em";
    sentence.style.paddingTop = "4px";
    sentence.style.paddingBottom = "4px";
  };
  sentenceTexts[2].style.marginLeft = "-22px";
  sentenceTexts[3].style.marginLeft = "-22px";
  sentenceTexts[3].style.marginRight = "0px";
}

function styleDropDown (dropdownClass) {
  eventsDropdown = document.getElementsByClassName(dropdownClass);
  for (dropdown of eventsDropdown) {
    dropdown.style.width = "5em";
    dropdown.style.fontSize = "1.4em";
  };
}

function styleMinDate (minDateClass) {
  minDateStyle = document.getElementsByClassName(minDateClass);
  minDateStyle[0].style.width = "6.2em";
  minDateStyle[0].style.fontSize = "1.4em";
  minDateStyle[0].style.paddingLeft = "0px";
  minDateStyle[0].style.paddingTop = "0px";
  minDateStyle[0].style.paddingBottom = "0px";
  minDateStyle[0].style.textAlign = "left";
}

function styleMaxDate(maxDateClass) {
  maxDateStyle = document.getElementsByClassName(maxDateClass);
  maxDateStyle[0].style.width = "6.2em";
  maxDateStyle[0].style.fontSize = "1.4em";
  maxDateStyle[0].style.paddingLeft = "0.1em";
  maxDateStyle[0].style.paddingTop = "0px";
  maxDateStyle[0].style.paddingBottom = "0px";
  maxDateStyle[0].style.textAlign = "left";
}

function styleLocation(locationClass) {
  formLocation = document.getElementsByClassName(locationClass);
  formLocation[0].style.width = "6.3em";
  formLocation[0].style.fontSize = "1.4em";
  formLocation[0].style.paddingLeft = "0px";
}

function styleSaveContainer(containerClass) {
  saveContainer = document.getElementsByClassName(containerClass);
  saveContainer[0].style.float = "right";
  saveButton = document.getElementsByClassName('save-button');
  saveButton[0].style.fontSize = "0.55em";
  saveButton[0].textContent = "TWEAK";
}

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
