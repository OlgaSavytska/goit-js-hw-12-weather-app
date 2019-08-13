import './getGeoPosition.js';


const baseUrl = 'https://api.apixu.com/v1';
const resourse = '/current.json';
const querryString = '?key=d9e4c9bc0f41460394f80159191208&q=';


export default function fetchWeather(query = locQuery) {

    return fetch(baseUrl + resourse + querryString + query)
        .then(response => {
            return response.json();
        })
}


    
    