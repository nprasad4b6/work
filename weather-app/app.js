const geocode = require('./utils/geocode')
const forecast = require("./utils/forecast")
const chalk = require('chalk')
// const yargs = require('yargs')

// const command = yargs.argv
// const address = command._[0]

const address = process.argv[2]

if (!address) {
    console.log(chalk.red.inverse("Please provide address to serch"))
} else {

    geocode(address, (error,data) => {
        if (error) {
            console.log(error)
        } else {
            console.log(data)
            forecast(data, (error,response)=>{
                if (error) {
                    console.log(error)
                } else {
                    console.log(response.body.daily.data[0].summary + ' It is currently ' +
                        response.body.currently.temperature + ' degrees out. There is a ' +
                        response.body.currently.precipProbability + '% chance of rain.')

                }
            })
        }
    })
}
