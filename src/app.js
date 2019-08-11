const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


app = express()
const port = process.env.PORT || 3000

// Define paths for Express Configs
publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rohitashwa Nigam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rohitashwa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Help',
        name: 'Rohitashwa niGam'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No location received !'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-not-found', {
        title: '404 Not Found',
        name: 'Rohitashwa Nigam',
        error: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404-not-found', {
        title: '404 Not Found',
        name: 'Rohitashwa Nigam',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on ' + port)
})