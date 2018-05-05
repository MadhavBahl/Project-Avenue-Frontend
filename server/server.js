const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const unirest = require('unirest');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser());
app.set('views', __dirname + '/../views');
app.use(express.static(__dirname + '/../public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/doctor', (req, res) => {
    res.render('doctor.hbs');
});

app.post('/signup', (req,res) => {
    var resp = req.body;
    unirest.post('https://avenue-angelhack.herokuapp.com/authenticate/doctor/register')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send(resp)
        .end(function (response) {
            res.render('registered.hbs');
        });
});

app.post('/login', (req,res) => {
    var resp = req.body;
    unirest.post('https://avenue-angelhack.herokuapp.com/authenticate/doctor/login')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send(resp)
        .end(function (response) {
            res.send(response);
        });
});

app.listen (port, () => {
    console.log(`App listening on port ${port}`);
});