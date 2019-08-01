const request = require("request")


const geocode = (address, callback) => {
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?limit=2&access_token=pk.eyJ1IjoibnByYXNhZDRiNiIsImEiOiJjang4bzc3ZXQwN2I0M3RtenR3cDFnczJzIn0.pNY2vBvGT971rL1JdKaLwg"
 
    request({
        url: geocodeurl,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to location services`)
        } else if (body.features.length === 0) {
            callback(`No matches found with u r location , try with different`)
        } else {
            const location = body.features[0].place_name
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            callback(undefined,{latitude,longitude,location})      
        }
    })
}

module.exports = geocode