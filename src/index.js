import './styles.css';
import getCurrentPosition from './getGeoPosition.js';
import fetchWeather from './fetchWeather.js';
import './getGeoPosition.js';
import PNotify from '../node_modules/pnotify/dist/es/PNotify';



const bodyDoc = document.querySelector('body');
const buttonDoc = document.querySelector('#button')
const formDoc = document.querySelector('#search-form');


const weatherDoc = document.querySelector('#weather')
const tempDoc = document.querySelector('[data-field="temp"]');
const humidityDoc = document.querySelector('[data-field="humidity"]');
const windDoc = document.querySelector('[data-field="wind"]');
const conditionsDoc = document.querySelector('[data-field="conditions"]');
const conditionsDoc_Icon = document.querySelector('.icon');
const locationDoc = document.querySelector('[data-field="location"]')

let locQuery;

function dataWeather(data) {
    const temperature = data.current.temp_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const conditions = data.current.condition.text;
    const dataLocation = data.location.name;
    const geoLocation = locQuery;
    const conditionsDoc_IconConst = data.current.condition.icon;

    locationDoc.textContent = dataLocation;
    tempDoc.textContent = `${temperature}*`;
    humidityDoc.textContent = `${humidity}%`;
    windDoc.textContent = `${wind} kph`;
    conditionsDoc.textContent = conditions;
    conditionsDoc_Icon.textContent = conditionsDoc_IconConst;
}


getCurrentPosition()
    .then(location => {
        console.log(location);
        locQuery = `${location.coords.latitude},${location.coords.longitude}`;

        fetchWeather(locQuery)
            .then(data => {
                console.log(data);
                dataWeather(data);
                weatherDoc.classList.remove('is-hidden');
            })
    })
    .catch(error => {
        PNotify.alert('Нет прав доступа к геопозиции, используйте поиск по имени города');
    });


// console.log(formDoc);
formDoc.addEventListener('submit', (e) => {
    e.preventDefault()
    const userQuery = e.currentTarget.elements.city.value;
    // console.log(e.currentTarget.elements.city.value)
    fetchWeather(userQuery)
    .then(data => {
        console.log(data);
        dataWeather(data);
        weatherDoc.classList.remove('is-hidden');
    })
    .catch(error => {
    PNotify.alert('Напишите город нормально');
    });
})

