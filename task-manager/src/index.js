const app = require('./app')

const Port = process.env.PORT

app.listen(Port, ()=>{
    console.log(`server listens on port ${Port}`)
})