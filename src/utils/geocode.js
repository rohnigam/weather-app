const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
                '.json?access_token=pk.eyJ1IjoiY29kZS1iaWxsbWFyayIsImEiOiJjanozcnAzcWEwNjJqM2lvODFycDRsOHl5In0.ePJdyBnVwgiwt06bnsnFcA&limit=1'
    request({url,json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to internal services')
        } else if (body.features.length === 0) {
            callback('Address Not Found, Please Try Again!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode