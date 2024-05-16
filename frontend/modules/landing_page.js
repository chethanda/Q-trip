import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log( "frominit()")
  console.log(config)
  console.log(cities)
  

  

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    // Fetch cities using the Backend API and return the data
    let response = await fetch('http://52.66.229.82:8082/cities');

    if (!response.ok) {
      console.log('Failed to fetch data from the API. Status:', response.status);
      return null; // Return null in case of an error
    }

    let data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    return null; // Return null in case of an error
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityCard = document.createElement('div');
  cityCard.className = 'col-md-3 col-6 text-dark'; 

  

  cityCard.innerHTML = `
    <a id="${id}" href="pages/adventures/?city=${id}">
    <img src="${image}" alt="${city}" class='img-fluid'>
    <h2>${city}</h2>
    <p>${description}</p>
    </a>
  `;

  const contentSection = document.getElementById('data');

  contentSection.appendChild(cityCard);

}

export { init, fetchCities, addCityToDOM };
