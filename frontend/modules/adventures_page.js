import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  const urlParams = new URLSearchParams(search);
  const city = urlParams.get('city');
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {

  try {
  let  data =await fetch(config.backendEndpoint+/adventures?city=${city})
  return data.json();   
  }catch {
    return null;
  }
}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  const adventureContainer = 
  
  adventures.forEach(adventure => {
    const card = document.createElement('div');
    card.setAttribute("class" , "col-12 col-sm-6 col-lg-3 mb-3")

    card.innerHTML=`
      <a id=${adventure.id} href="detail/?adventure=${adventure.id}">
      <div class='card activity-card'>
      <img src =${adventure.image}>
      <div class='category-banner'>${adventure.category}</div>
      <div class='card-body col-md-12 mt-2'>
      <div class='d-flex justify-content-between'>
      <p>${adventure.name}</p>
      <p>${adventure.costPerHead}</p>
      </div>
      <div class='d-flex justify-content-between'>
      <p>Duration</p>
      <p>${adventure.duration}Hours</p>
      </div>
      </div>
      </div>
      </a>
    `
    document.getElementById('data').append(card)
  })
    // card.className = 'activity-card col-lg-3 col-md-6 col-6';

    // Create a link for each adventure card with the correct href
  //   const link = document.createElement('a');
  //   link.href = detail/?adventure=${adventure.id};
  //   link.id = adventure.id; // Set the id attribute

  //   const categoryBanner = document.createElement('div');
  //   categoryBanner.className = 'category-banner';
  //   categoryBanner.textContent = adventure.category;

  //   const image = document.createElement('img');
  //   image.src = adventure.image;
  //   image.alt = adventure.name;
  //   image.className = 'activity-card img';

  //   const adventureDetails = document.createElement('div');
  //   adventureDetails.className = 'activity-details';
  //   adventureDetails.innerHTML = `
  //     <h2>${adventure.name}</h2>
  //     <p>Cost per head: $${adventure.costPerHead}</p>
  //     <p>Duration: ${adventure.duration} hours</p>
  //   `;

  //   link.appendChild(categoryBanner);
  //   link.appendChild(image);
  //   card.appendChild(link);
  //   card.appendChild(adventureDetails);
  //   adventureContainer.appendChild(card);
  // });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredlist = list.filter((list)=>list.duration >low && list.duration<=high)
  return filteredlist
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredlist = list.filter((list)=>
    categoryList.includes(list.category)
  )
  return filteredlist

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredlist = [];

  if(filters['duration'] && filters['category'].length>0 ){
    let choice=filters['duration'].split('-')
    filteredlist=filterByDuration(list , 
      parseInt(choice[0]),
      parseInt(choice[1]))

      filteredlist=filterByCategory(filteredlist , filters['category'])

  }


  else if(filters['duration']){
    let choice = filters['duration'].split('-')
    filteredlist= filterByDuration(list , parseInt(choice[0]) , parseInt(choice[1]))
  }

  else if(filters['category'].length>0){
      filteredlist=filterByCategory(list , filters['category'])
  }
  else {
    filteredlist=list
  }
  return filteredlist


  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters" , JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById('duration-select').value = filters.duration;
  filters['category'].forEach((key)=>{
    let ele = document.createElement('div')
    ele.className='category-filter'
    ele.innerHTML=`
         <div>${key}</div>
    `

    document.getElementById('category-list').appendChild(ele)

    
  })
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
