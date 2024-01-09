let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];
let yearmonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let data = {};
let search = document.getElementById("locationinput");
let findbtn = document.getElementById("locationbtn");

async function getweather(location = "cairo") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e7ac4dc1c446410aae5124141240801&q=${location}&days=3`
  );
  if (response.ok == true) {
    let finalResponse = await response.json();
    data = finalResponse;
    Displayweather();

    search.addEventListener("input", function () {
      if (search.value != "") {
        searchlocation(location);
      }
    });
    findbtn.addEventListener("click", function () {
      if (search.value != "") {
        searchlocation(location);
      }
    });
  }
}
getweather();
search.addEventListener("input", function () {
  if (search.value != "") {
    getweather(search.value);
  }
});

let enter = document.getElementById("enter");
let xicon = document.getElementById("x-icon");
findbtn.addEventListener("click", function () {
  if (search.value == "") {
    enter.classList.replace("d-none", "d-block");
  }
});

function clear() {
  enter.classList.replace("d-block", "d-none");
}
xicon.addEventListener("click", function () {
  clear();
});
document.addEventListener("keyup", function (e) {
  if (e.key == "Escape") {
    clear();
  }
});

function Displayweather() {
  let day1 = new Date(`${data.forecast.forecastday[0].date}`);
  let day2 = new Date(`${data.forecast.forecastday[1].date}`);
  let day3 = new Date(`${data.forecast.forecastday[2].date}`);

  let col = "";
  col += `
    <div class="col-md-4">
              <div>
                <div class="header1 head1 wfs d-flex justify-content-between align-items-center p-2">
                  <p class="mb-0">${weekday[day1.getDay()]}</p>
                  <p class="mb-0">${
                    day1.getDate() + yearmonth[day1.getMonth()]
                  }</p>
                </div>
                <div class="wbody1 wbod1 p-3">
                  <p class="city">${data.location.name}</p>
                  <div class="d-flex mb-3  justify-content-between align-items-center">
                    <div class="fw-bold currentdeg">
                      ${data.current.temp_c}<sup>o</sup>C
                    </div>
                    <div>
                    <img src="${
                      "https:" + data.current.condition.icon
                    }" class="w-100" alt="${data.current.condition.text}">
                    </div>
                  </div>
                  <span class="state">${data.current.condition.text}</span>
                  <div class="rate pt-3 pb-2 d-flex justify-content-start align-items-center">
                    <div class="pe-3">
                      <img src="Assests/imgs/icon-umberella.png" class="d-inline"  alt="umberlla">
                      <p class="d-inline">20%</p>
                    </div>
                    <div class="pe-3">
                      <img src="Assests/imgs/icon-wind.png" class="d-inline"  alt="umberlla">
                      <p class="d-inline">18km/h</p>
                    </div>
                    <div>
                      <img src="Assests/imgs/icon-compass.png" class="d-inline"  alt="umberlla">
                      <p class="d-inline">East</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center h-100">
                <div class="header2 p-2 wfs">
                  <p class="mb-0">${weekday[day2.getDay()]}</p>
                </div>
                <div class="wbody2 p-3">
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <div class="pb-1">
                    <img src="${
                      "https:" + data.forecast.forecastday[1].day.condition.icon
                    }" class="w-100" alt="${
    data.forecast.forecastday[1].day.condition.text
  }">
                    </div>
                    <div class="py-3">
                      <p class="maxtemp fw-bold text-white mb-0">${
                        data.forecast.forecastday[1].day.maxtemp_c
                      }<sup>o</sup>C</p>
                      <p class="mintemp fw-light">${
                        data.forecast.forecastday[1].day.mintemp_c
                      }<sup>o</sup>C</p>
                    </div>
                    <span class="state pt-1 mb-2 ">${
                      data.forecast.forecastday[1].day.condition.text
                    }</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center">
                <div class="header3 head1 p-2 wfs">
                  <p class="mb-0">${weekday[day3.getDay()]}</p>
                </div>
                <div class="wbod1 wbody3 p-3">
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <div class="pb-1">
                    <img src="${
                      "https:" + data.forecast.forecastday[2].day.condition.icon
                    }" class="w-100" alt="${
    data.forecast.forecastday[2].day.condition.text
  }">
                    </div>
                    <div class="py-3">
                      <p class="maxtemp fw-bold text-white mb-0">${
                        data.forecast.forecastday[2].day.maxtemp_c
                      }<sup>o</sup>C</p>
                      <p class="mintemp fw-light">${
                        data.forecast.forecastday[2].day.mintemp_c
                      }<sup>o</sup>C</p>
                    </div>
                    <span class="state pt-1">${
                      data.forecast.forecastday[2].day.condition.text
                    }</span>
                  </div>
                </div>
              </div>
            </div>
    `;
  document.getElementById("rowdata").innerHTML = col;
}

function searchlocation(local) {
  let x = search.value;
  local = x;
  // var col=''

  if (data.location.name.toLowerCase().includes(local.toLowerCase())) {
    col += `
    <div class="col-md-4">
              <div>
                <div class="header1 head1 wfs d-flex justify-content-between align-items-center p-2">
                  <p class="mb-0">${weekday[day1.getDay()]}</p>
                  <p class="mb-0">${
                    day1.getDate() + yearmonth[day1.getMonth()]
                  }</p>
                </div>
                <div class="wbody1 wbod1 p-3">
                  <p class="city">${data.location.name}</p>
                  <div class="d-flex mb-3  justify-content-between align-items-center">
                    <div class="fw-bold currentdeg">
                      ${data.current.temp_c}<sup>o</sup>C
                    </div>
                    <div>
                    <img src="${
                      "https:" + data.current.condition.icon
                    }" class="w-100" alt="${data.current.condition.text}">
                    </div>
                  </div>
                  <span class="state">${data.current.condition.text}</span>
                  <div class="rate pt-3 pb-2 d-flex justify-content-start align-items-center">
                    <div class="pe-3">
                      <img src="Assests/imgs/icon-umberella.png" class="d-inline"  alt="umberlla">
                      <p class="d-inline">20%</p>
                    </div>
                    <div class="pe-3">
                      <img src="Assests/imgs/icon-wind.png" class="d-inline"  alt="umberlla">
                      <p class="d-inline">18km/h</p>
                    </div>
                    <div>
                      <img src="Assests/imgs/icon-compass.png" class="d-inline"  alt="umberlla">
                      <p class="d-inline">East</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center h-100">
                <div class="header2 p-2 wfs">
                  <p class="mb-0">${weekday[day2.getDay()]}</p>
                </div>
                <div class="wbody2 p-3">
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <div class="pb-1">
                    <img src="${
                      "https:" + data.forecast.forecastday[1].day.condition.icon
                    }" class="w-100" alt="${
      data.forecast.forecastday[1].day.condition.text
    }">
                    </div>
                    <div class="py-3">
                      <p class="maxtemp fw-bold text-white mb-0">${
                        data.forecast.forecastday[1].day.maxtemp_c
                      }<sup>o</sup>C</p>
                      <p class="mintemp fw-light">${
                        data.forecast.forecastday[1].day.mintemp_c
                      }<sup>o</sup>C</p>
                    </div>
                    <span class="state pt-1 mb-2 ">${
                      data.forecast.forecastday[1].day.condition.text
                    }</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center">
                <div class="header3 head1 p-2 wfs">
                  <p class="mb-0">${weekday[day3.getDay()]}</p>
                </div>
                <div class="wbod1 wbody3 p-3">
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <div class="pb-1">
                    <img src="${
                      "https:" + data.forecast.forecastday[2].day.condition.icon
                    }" class="w-100" alt="${
      data.forecast.forecastday[2].day.condition.text
    }">
                    </div>
                    <div class="py-3">
                      <p class="maxtemp fw-bold text-white mb-0">${
                        data.forecast.forecastday[2].day.maxtemp_c
                      }<sup>o</sup>C</p>
                      <p class="mintemp fw-light">${
                        data.forecast.forecastday[2].day.mintemp_c
                      }<sup>o</sup>C</p>
                    </div>
                    <span class="state pt-1">${
                      data.forecast.forecastday[2].day.condition.text
                    }</span>
                  </div>
                </div>
              </div>
            </div>
    `;
    document.getElementById("rowdata").innerHTML = col;
  }
}
