const request = require("request")

const forecast = (data, callback) => {
    const url = "https://api.darksky.net/forecast/fdcd3c13e0ebfc70cc191f07d5f86bd1/"
 
    request({
        url: url + data.latitude + "," + data.longitude,
        json: true
    }, (error, response) => {
        if (error) {
            callback(`Unable to connect`)
        } else if (response.body.error) {
            callback(`Unable to find location`)
        } else {
             callback(undefined,response)
        }
    })
}

module.exports = forecast