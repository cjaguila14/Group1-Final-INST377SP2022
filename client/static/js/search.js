let form = document.getElementById("form");
let btn = document.getElementById("btn");
let msgContainer = document.getElementById("msg-container");
let msg = document.getElementById("msg");
let drop = document.getElementById("states");





// on load
document.addEventListener("DOMContentLoaded", async() => {
    append_states(states);
});

// on submit click
form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const results = await fetch('/api/earth_info', {
        method: 'POST',
        body: JSON.stringify({
            state: drop.value
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const arrayFromJson = await results.json();
    if (arrayFromJson.data.length <= 0) {
        bad();
    } else {
        good(arrayFromJson.data.length);
    }
    // generate results
    cards(arrayFromJson);
});



/********************* Aux functions **********************/

// generate result cards 

const cards = (data) => {
    let str = "";
    let count = 1;
    data.data.forEach((elem) => {
        str += `<div class="card">`;
        str += `<h2> Earthquake ${count} </h2>`;
        str += `<p><strong>Date: </strong>${dateRegex(elem.date)}</p>`
        str += `<p><strong>Latitude: </strong>${elem.latitude}</p>`;
        str += `<p><strong>Longitude: </strong>${elem.latitude}</p>`;
        str += `<p><strong>Magnitude: </strong>${elem.magnitude}</p>`;
        str += `<p><strong>Depth: </strong>${elem.depth}</p>`;
        str += `<p><strong>Homes Damaged: </strong>${elem.num_home_damaged}</p>`;
        str += `<p><strong>People Displaced: </strong>${elem.people_displaced}</p>`;
        str += `</div>`;
        count++;
    })
    document.getElementById("rc").innerHTML = str;
}



function dateRegex(str) {
    if (str != null) {
        let regex = /[0-9]+-[0-9]+-[0-9]+/i;
        let mct = str.match(regex);
        return mct;
    }
    return "N/A";
}

// Add dropdown options
const append_states = (arr) => {
    arr.forEach((elem) => {
        let option = document.createElement("option");
        option.text = elem.text;
        option.value = elem.value;
        let select = document.getElementById("states");
        select.appendChild(option);
    })
}

const good = (num) => {
    msgContainer.classList.remove("hide")
    msg.innerHTML = `Looks good. Returned ${num} results!`;
    msgContainer.classList.remove("failure");
    msgContainer.classList.add("success");
}
const bad = () => {
    msgContainer.classList.remove("hide")
    msg.innerHTML = `No results were found`;
    msgContainer.classList.remove("success");
    msgContainer.classList.add("failure");
}



let states = [
    { value: "AK", text: "Alaska" },
    { value: "AL", text: "Alabama" },
    { value: "AR", text: "Arkansas" },
    { value: "AS", text: "American Samoa" },
    { value: "AZ", text: "Arizona" },
    { value: "CA", text: "California" },
    { value: "CO", text: "Colorado" },
    { value: "CT", text: "Connecticut" },
    { value: "DC", text: "District of Columbia" },
    { value: "DE", text: "Delaware" },
    { value: "FL", text: "Florida" },
    { value: "GA", text: "Georgia" },
    { value: "GU", text: "Guam" },
    { value: "HI", text: "Hawaii" },
    { value: "IA", text: "Iowa" },
    { value: "ID", text: "Idaho" },
    { value: "IL", text: "Illinois" },
    { value: "IN", text: "Indiana" },
    { value: "KS", text: "Kansas" },
    { value: "KY", text: "Kentucky" },
    { value: "LA", text: "Louisiana" },
    { value: "MA", text: "Massachusetts" },
    { value: "MD", text: "Maryland" },
    { value: "ME", text: "Maine" },
    { value: "MI", text: "Michigan" },
    { value: "MN", text: "Minnesota" },
    { value: "MO", text: "Missouri" },
    { value: "MS", text: "Mississippi" },
    { value: "MT", text: "Montana" },
    { value: "NC", text: "North Carolina" },
    { value: "ND", text: "North Dakota" },
    { value: "NE", text: "Nebraska" },
    { value: "NH", text: "New Hampshire" },
    { value: "NJ", text: "New Jersey" },
    { value: "NM", text: "New Mexico" },
    { value: "NV", text: "Nevada" },
    { value: "NY", text: "New York" },
    { value: "OH", text: "Ohio" },
    { value: "OK", text: "Oklahoma" },
    { value: "OR", text: "Oregon" },
    { value: "PA", text: "Pennsylvania" },
    { value: "PR", text: "Puerto Rico" },
    { value: "RI", text: "Rhode Island" },
    { value: "SC", text: "South Carolina" },
    { value: "SD", text: "South Dakota" },
    { value: "TN", text: "Tennessee" },
    { value: "TX", text: "Texas" },
    { value: "UT", text: "Utah" },
    { value: "VA", text: "Virginia" },
    { value: "VI", text: "Virgin Islands" },
    { value: "VT", text: "Vermont" },
    { value: "WA", text: "Washington" },
    { value: "WI", text: "Wisconsin" },
    { value: "WV", text: "West Virginia" },
    { value: "WY", text: "Wyoming" }
]