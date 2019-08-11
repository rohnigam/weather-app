const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/56514172768b732c3befce8a6a949584/'+ latitude + ',' +
               longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect with internal services')
        } else if (body.error) {
            callback(body.error)
        } else {
            callback(undefined, body.daily.data[0].summary + 
                     ' It is currently ' + body.currently.apparentTemperature + ' degrees out. ' +
                     'There is ' + body.currently.precipProbability * 100 + '% chance of rain. ' + 
                     'Max temperature of ' + body.daily.data[0].temperatureHigh + ' and a Min temperature of ' +
                     body.daily.data[0].temperatureLow + ' degrees today.')
        }
    })
}

module.exports = forecast