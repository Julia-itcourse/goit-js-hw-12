function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.error(`Oops, we have an error! - ${err}`));
}

export default fetchCountries;
