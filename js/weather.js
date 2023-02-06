const weatherSection = document.querySelector('.section--weather');
const weatherText = document.querySelector('.form__text');
const weatherBtn = document.querySelector('.form__button');

const weatherLocaton = [];

const api_key = '0809c3f0959e4799961175944232301';
const getWeather = function (town) {
    return fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${town}&aqi=no`)
        .then(res => res.json())
        .then(data => data)
}

const createWeatherInfoDiv = function (apiResponse) {
    weatherLocaton.push(apiResponse.location.name.toUpperCase());
    const weatherInfo = document.createElement('div');
    const weatherInfoPlace = document.createElement('div');
    const weatherInfoImg = document.createElement('div');
    const weatherInfoCondition = document.createElement('div');
    const weatherInfoTemperature = document.createElement('div');

    weatherInfo.classList.add('weather-info');
    weatherInfoPlace.classList.add('weather-info__element');
    weatherInfoPlace.classList.add('weather-info__element--place');
    weatherInfoImg.classList.add('weather-info__element');
    weatherInfoCondition.classList.add('weather-info__element');
    weatherInfoTemperature.classList.add('weather-info__element');

    weatherInfoPlace.innerText = apiResponse.location.name;
    weatherInfoImg.innerHTML = `<img src='${apiResponse.current.condition.icon}'/>`;
    weatherInfoCondition.innerText = `Condition: ${apiResponse.current.condition.text}`;
    weatherInfoTemperature.innerText = `Temperature: ${apiResponse.current.temp_c}°C | ${apiResponse.current.temp_f}°F`;

    weatherSection.appendChild(weatherInfo);
    weatherInfo.appendChild(weatherInfoPlace);
    weatherInfo.appendChild(weatherInfoImg);
    weatherInfo.appendChild(weatherInfoCondition);
    weatherInfo.appendChild(weatherInfoTemperature);
}

const createWarningDiv = function () {
    const divWarning = document.createElement('div');
    divWarning.innerText = `Is something wrong:\n 
    - Try again check if spelling is correct\n 
    - If it still happens try again later\n
    This massage will disappear after 5 sec.`;
    divWarning.classList.add('warning');
    if (weatherSection.children.length === 1) {
        weatherSection.appendChild(divWarning);
    } else {
        weatherSection.insertBefore(divWarning, weatherSection.children[1]);
    }
    setTimeout(() => {
        divWarning.remove()
    }, 5000)
}

const createWeatherSectionElements = async function (town) {
    try {
        const weather = await getWeather(town);
        if (weather.error) {
            throw weather.error
        }
        createWeatherInfoDiv(weather);

    } catch (error) {
        console.error(error);
        createWarningDiv();
    }
}
const weatherEventListner = function () {
    weatherBtn.addEventListener('click', e => {
        e.preventDefault();
        if (weatherLocaton.findIndex(el => el == weatherText.value.toUpperCase()) === -1) {
            createWeatherSectionElements(weatherText.value)
        }
    })
}
export default weatherEventListner;