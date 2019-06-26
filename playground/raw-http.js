const https = require('https')

const url = "https://api.darksky.net/forecast/fdcd3c13e0ebfc70cc191f07d5f86bd1/83.41667,18.11667"

const request =https.request(url,(response)=>{
    let data = ''
    response.on('data', (chunk)=>{
        data = data + chunk.toString()
    })

    response.on('end', ()=>{
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error)=>{
    console.log(`error is ${error}`)
})


request.end()