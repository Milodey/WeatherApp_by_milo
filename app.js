const express = require('express');
const hbs = require('hbs');
const path = require('path');
const {
    listen
} = require('express/lib/application');
const res = require('express/lib/response');
// const watherData = require('../utils/weatherData');
const weatherData = require('./utils/weatherData');
const {
    title
} = require('process');
const app = express();



const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '/public')

const viewsPath = path.join(__dirname, ('/templates/views'));
const partialsPath = path.join(__dirname, ('/templates/partials'));


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather by Milo"
    })

})

app.get('', (req, res) => {
    res.send('hi this is your fired page');
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "Must enter address in search text box"
        })
    }
    weatherData(address, (error, {
        temperature,
        description,
        cityName
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "Page not found \n Please retry"
    })
})

app.listen(port, () => {
    console.log("server is fired on port ", port);
})