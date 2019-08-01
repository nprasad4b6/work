const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const pubDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// sets view engine as hbs.so serches for files in views foldes by default
app.set('view engine','hbs')
app.set('views',viewsPath )
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(pubDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'welcome page',
        name:'Prasad'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Prasad'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Prasad'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
      return res.send({
          error:'address should provide'})
    }

    geocode(req.query.address, (error,{latitude,longitude,location}= {}) => {
        if (error) {
            return res.send({error})
        } else {
            forecast(latitude,longitude, (error,forecast)=>{
                if (error) {
                    return res.send({error})
                } else {
                    return res.send({
                        forecast,
                        location,
                        address: req.query.address,
                    })
                }
            })
        }
    })
})


app.get('*', (req,res)=>{
    res.render('404',{
        title:'Help page',
        errormsg:'Not found u r requested page',
        name:'Prasad'
    })
})
// app.get('',(req,res)=>{
//     res.send('Hello.. Welcome to default page')
// })

// app.get('/help',(req,res)=>{
//     res.send('Hello.. Welcome to help page')
// }

// app.get('/about',(req,res)=>{
//     res.send('Hello.. Welcome to About page')
// })


app.listen(3000,()=>{
    console.log(`Server starts listenes on port 3000`)
})