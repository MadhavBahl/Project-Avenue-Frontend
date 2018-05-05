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

/* ===================================================================== */
/* ===== These routes are for tessting and can be removed later on ===== */
/* ===================================================================== */

app.get('/docPat', (req, res) => {
    res.render('docPat.hbs', {
        random: "Random Data"
    });
});

/* ===================================================================== */

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
            console.log(response.body);
            if (response.body.success === true)
                res.render('registered.hbs', { code: 'Congratulations! You have successfully registered'});
            else 
                res.render('registered.hbs', { code: 'Sorry! There was some problem, please try again!'});
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