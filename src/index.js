import './styles.css';
import debounce from 'lodash/debounce';
import refs from './js/refs';
import fetchCountries from './js/fetch-countries';
import updateCountriesMarkup from './js/update-countries-markup';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countryTemplate from './templates/country.hbs';
import countriesTemplate from './templates/countries.hbs';

refs.input.addEventListener('input', debounce(setData, 500));

function setData() {
  let searchQuery = refs.input.value;

  console.log(searchQuery);

  fetchCountries(searchQuery).then(data => {
    console.log(data);
    let markup = '';
    if (isSuccessfulResponse(data)) {
      console.log(data);
      markup = buildMarkup(data);
    } else {
      error({
        title: 'No results!',
        text: 'Please check the speling and try again',
      });
    }
    updateCountriesMarkup(markup);
  });
}

function isSuccessfulResponse(data) {
  return Array.isArray(data);
}

function buildMarkup(data) {
  let markup;
  if (data.length > 10) {
    markup = '';
    console.log('Markup =' + markup);
    error({
      title: 'Too many results!',
      text: 'Please try a more specific query.',
    });
  } else if (data.length > 1 && data.length <= 10) {
    markup = countriesTemplate(data);
  } else {
    markup = countryTemplate(data[0]);
  }
  return markup;
}
