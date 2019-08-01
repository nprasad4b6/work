const request = require("request")

const forecast = (latitude,longitude, callback) => {
    const url = "https://api.darksky.net/forecast/fdcd3c13e0ebfc70cc191f07d5f86bd1/"
 
    request({
        url: url + latitude + "," + longitude,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect`)
        } else if (body.error) {
            callback(`Unable to find location`)
        } else {
            const forecast = body.daily.data[0].summary + ' It is currently ' +
            body.currently.temperature + ' degrees out. There is a ' +
            body.currently.precipProbability + '% chance of rain.'
            callback(undefined,forecast)
        }
    })
}

module.exports = forecast