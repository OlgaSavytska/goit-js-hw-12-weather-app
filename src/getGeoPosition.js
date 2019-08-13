

const getCurrentPosition = () => {
    console.log('start');
    const options = {
        timeout: 10000,
        maximumAge: 30 * 60 * 1000,
        
    }
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);   
    }) 
}

export default getCurrentPosition;

    
