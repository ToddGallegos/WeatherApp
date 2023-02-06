
console.log("test")
const getFormData = async (event) => {
    event.preventDefault();
    const city = event.target.city.value;
    const state = event.target.state.value;
    event.target.city.value = "";
    event.target.state.value = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&appid=${API_KEY}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();

    const general = data.weather[0].main;
    const temp = data.main.temp;
    const name = data.name;
    const high = data.main.temp_max;
    const low = data.main.temp_min;
    const humidity = data.main.humidity;
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const myData = {
        general: general,
        temp: temp,
        name: name,
        state: state,
        high: high,
        low: low,
        humidity: humidity,
    };

    const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();

    const date1 = data2.list[0].dt_txt;
    const weather1 = data2.list[0].weather[0].description;
    const date2 = data2.list[1].dt_txt;
    const weather2 = data2.list[1].weather[0].description;
    const date3 = data2.list[2].dt_txt;
    const weather3 = data2.list[2].weather[0].description;
    const date4 = data2.list[3].dt_txt;
    const weather4 = data2.list[3].weather[0].description;
    const date5 = data2.list[4].dt_txt;
    const weather5 = data2.list[4].weather[0].description;

    const myData2 = {
        date1: date1,
        weather1: weather1,
        date2: date2,
        weather2: weather2,
        date3: date3,
        weather3: weather3,
        date4: date4,
        weather4: weather4,
        date5: date5,
        weather5: weather5,
    };

    addToPage(myData);
    addToPage2(myData2, myData);
};

const addToPage = (myData) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-light" style="width: 20rem">
            <div class="card-body">
                <h5 style="text-align:center" class="card-title">${myData.name} ${myData.state.toUpperCase()} Currently:</h5>
                <p style="text-align:center" class="card-text">${myData.general}</p>
            </div>
            <ul style="text-align:left" class="list-group list-group-flush">
                <li class="list-group-item">Temp: ${myData.temp}°F</li>
                <li class="list-group-item">High: ${myData.high}°F</li>
                <li class="list-group-item">Low: ${myData.low}°F</li>
                <li class="list-group-item">Humidity: ${myData.humidity}%</li>
            </ul>
        </div>
        `;

    const container = document.querySelector("#weatherCardDiv");
    if (container.innerHTML !== "") {
        container.innerHTML = "";
    }
    container.append(card);
};

const addToPage2 = (myData2, myData) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-light" style="width: 20rem">
            <div class="card-body">
                <h5 style="text-align:center" class="card-title">${myData.name} ${myData.state.toUpperCase()} Hourly:</h5>
            </div>
            <ul style="text-align:left" class="list-group list-group-flush">
                <li class="list-group-item">${myData2.date1}: ${myData2.weather1}</li>
                <li class="list-group-item">${myData2.date2}: ${myData2.weather2}</li>
                <li class="list-group-item">${myData2.date3}: ${myData2.weather3}</li>
                <li class="list-group-item">${myData2.date4}: ${myData2.weather4}</li>
                <li class="list-group-item">${myData2.date5}: ${myData2.weather5}</li>
            </ul>
        </div>
        `;

    const container = document.querySelector("#forecastCardDiv");
    if (container.innerHTML !== "") {
        container.innerHTML = "";
    }
    container.append(card);
};

const myForm = document.getElementById("weatherForm");
myForm.addEventListener("submit", getFormData);
