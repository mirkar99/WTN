const weatherSection = document.querySelector('.section--weather');
const weatherText = document.querySelector('.form__text');
const weatherBtn = document.querySelector('.form__button');

const weatherLocaton = [];

const api_key ='0809c3f0959e4799961175944232301';
const getWeather = function(town){
return fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${town}&aqi=no`)
    .then(res=> res.json())
    .then(data => data)
    .catch(e => console.error('Error:', e))
}
const createWeatherSectionElements = async function(town){
    try{
        const weather = await getWeather(town);
        
        weatherLocaton.push(town.toUpperCase())
        const weatherInfo = document.createElement('div');
        const weatherInfoPlace = document.createElement('div');
        const weatherInfoImg = document.createElement('div');
        const weatherInfoCondition = document.createElement('div');
        const weatherInfoTemperature = document.createElement('div');

        weatherInfo.classList.add('weather-info')
        weatherInfoPlace.classList.add('weather-info__element')
        weatherInfoPlace.classList.add('weather-info__element--place')
        weatherInfoImg.classList.add('weather-info__element')
        weatherInfoCondition.classList.add('weather-info__element')
        weatherInfoTemperature.classList.add('weather-info__element')
        
        weatherInfoPlace.innerText=weather.location.name;
        weatherInfoImg.innerHTML=`<img src='${weather.current.condition.icon}'/>`
        weatherInfoCondition.innerText = `Condition: ${weather.current.condition.text}`
        weatherInfoTemperature.innerText = `Temperature: ${weather.current.temp_c}°`

        weatherSection.appendChild(weatherInfo);
        weatherInfo.appendChild(weatherInfoPlace)
        weatherInfo.appendChild(weatherInfoImg)
        weatherInfo.appendChild(weatherInfoCondition)
        weatherInfo.appendChild(weatherInfoTemperature)
        
    }catch{

    }
}
const weatherEventListner = function(){
    weatherBtn.addEventListener('click', e=>{
        e.preventDefault();
        if(weatherLocaton.findIndex(el => el == weatherText.value.toUpperCase())===-1){
            createWeatherSectionElements(weatherText.value)
        }
    })
}
export default weatherEventListner;