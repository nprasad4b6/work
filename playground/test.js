const request = require("request")


const geocode = (address) => {
    const geocodeurl = "http://localhost:3000/help"
 
    request({
        url: geocodeurl,
        json: true
    }, (error, response) => {
        if (error) {
            callback(`Unable to connect to location services`)
        } else if (!response) {
            callback(`No matches found with u r location , try with different`)
        } else {
           console.log(response.body)  
        }
    })
}

geocode("hello")

module.exports = geocode