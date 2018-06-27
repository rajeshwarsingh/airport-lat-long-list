
let getLatAndlng = (data, API_KEY) => {

    if(!(data && API_KEY)){
        return "please provide Airport Code and API_KEY"
    }
    const getEachLatlng = (airCode) => {
        return new Promise((resolve, reject) => {
            googleMapsClient.geocode({ address: airCode+' airport' })
                .asPromise()
                .then((response) => {
                    return resolve({ Code: airCode, lat: response.json.results[0].geometry.location.lat, lng: response.json.results[0].geometry.location.lng })
                })
                .catch((err) => {
                    return resolve({ Code: airCode, lat: null, lng: null })
                })
        })
    }

    const googleMapsClient = require('@google/maps').createClient({
        key: API_KEY,
        Promise: Promise
    });

    let allAirCodeData = data.map(getEachLatlng)

    var results = Promise.all(allAirCodeData); // pass array of promises
   	return results
}


module.exports = {
    getLatAndlng
}