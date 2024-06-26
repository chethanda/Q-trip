import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    let res = await fetch(config.backendEndpoint+/reservations/)
    if(!res.ok){
      console.log('fetch faild')
    }
    let data = await res.json()
    return data
  } catch (error) {
    return null;
  }


  // Place holder for functionality to work in the Stubs
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so thatc they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length > 0){
    document.getElementById('no-reservation-banner').style.display='none';
    document.getElementById('reservation-table-parent').style.display='block'
  }else{
    document.getElementById('reservation-table-parent').style.display='none'
    document.getElementById('no-reservation-banner').style.display='block';
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  reservations.map((key , ind) => {
    let ele = document.createElement('tr')
    ele.innerHTML=`
      <th scope='row'>${key.id}</th>
      <td>${key.name}</td>
      <td>${key.adventureName}</td>
      <td>${key.person}</td>
      <td>${new Date(key.date).toLocaleDateString('en-IN' , {
        day : "numeric" ,
        year : 'numeric' ,
        month : "numeric",
      })}</td>
      <td>${key.price}</td>
      let oldstyle = 
      <td>${new Date(key.time).toLocaleTimeString('en-IN' , {
        year : "numeric" ,
        day : "numeric" , 
        month : "long" ,
        hour : "numeric",
        minute : "numeric",
        second : "numeric",
        hour12:true,

      }).replace(/ at/i, ',')}</td>
      <td style='display : flex ; gap:5px ' id=${key.id}>
      <a href="../detail/?adventure=${key.adventure}">
    <button class="reservation-visit-button">Visit Adventure</button>
      </a>
      <div class='reservation-cancel-button' id =${key.id}>Cancel-Adventure</div>
      </td>
    `;

    document.getElementById('reservation-table').appendChild(ele)
    
  })

}

export { fetchReservations, addReservationToTable };