const express = require('express')
const path = require('path')
const hbs = require('hbs')
const weather = require('./utils/weather')
const geocode = require('./utils/geocode')

const server = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

server.use(express.static(publicDir))

// Set express's view engine and views directory
server.set('view engine', 'hbs')
server.set('views', viewsDir)
hbs.registerPartials(partialsDir)

server.get('', (req,res) => {
    res.render('index', {
        title:'Weather',
        name:'Omer Stein'
    })
})

server.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Omer Stein'
    })
})

server.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Omer Stein',
        helpMsg: 'This is a help msg!'
    })
})

server.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({err:'You must provide an address'})
    }

    const finalData = {
        address: req.query.address,
        location: '',
        forcast: '',
    }
    
    geocode(req.query.address, (err, {Name, Longitude, Latitude} = {} ) => {
        if(err) {
            return res.send({ err })
        } else {
            finalData.location += Name
            //res.send(`Finding weather for: ${Name}`)
            weather(Longitude, Latitude, findWeather)
        }
    })
    
    const findWeather = (err, data) => {
        if(err) {
            return res.send({ err })
        } else {
            finalData.forcast += data
            return res.send(finalData)
        }
    }


    // res.send({
    //     forcast:"It's gonna be rainy",
    //     location: req.query.address
    // })
})

server.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help',
        msg: 'Please choose a different help page'
    })
})

server.get('*', (req,res) => {
    res.render('404', {
        title: 'Weather',
        msg: 'Please choose a different page'
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}..`)
})