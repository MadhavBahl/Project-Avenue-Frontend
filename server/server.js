const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const unirest = require('unirest');

const {geocodeAddress} = require('./../serverFiles/geoCode');

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

app.get('/signup', (req, res) => {
    res.render('doctor.hbs');
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
            console.log(response.body.doctor.patients);
            // res.render('docPat.hbs',{ patData: response.body.doctor.patients });
            console.log(response.body._id);
            res.redirect(`fetchAll/${response.body.doctor._id}`);
        });
});

app.get('/fetchAll/:id', (req, res) => {
    var objId = req.params.id;
    unirest.post(`https://avenue-angelhack.herokuapp.com/doctor/fetchAllPatients/${objId}`)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send()
        .end(function (response) {
            
            res.render('docPat.hbs',{ patData: response.body.patients, id: objId });
            // res.redirect(`fetchAll/${}`)
        });
});

app.get('/newPat/:id', (req, res) => {
    var objId = req.params.id;
    res.render('newPat.hbs', { id: objId });
});

app.post('/createNewPat/:id', (req, res) => {
    var objId = req.params.id;
    
    geocodeAddress(req.body.address, (err, result) => {
        if (err) {
            return res.render('newPat.hbs', { id: objId });
        }

        var sendObj = {
            name: req.body.fname + " " + req.body.lname,
            address: result.address,
            geoaddress: result.geoaddress,
            email: req.body.email,
            contact: req.body.contact,
            disease_name: req.body.disease_name,
            disease_desc: req.body.disease_desc,
            img_url: req.body.img_url
        }
        console.log(sendObj);
        unirest.post(`https://avenue-angelhack.herokuapp.com/doctor/openCase/${objId}`)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send(sendObj)
        .end(function (response) {
            
            res.redirect(`/createdPat/${objId}`);
            // res.redirect(`fetchAll/${}`)
        });
    });
    
});

app.get('/createdPat/:id', (req, res) => {
    var objId = req.params.id;
    unirest.post(`https://avenue-angelhack.herokuapp.com/doctor/fetchAllPatients/${objId}`)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send()
        .end(function (response) {
            
            res.render('docPat.hbs',{ patData: response.body.patients, id: objId, success: 'Patient Registered Successfully!' });
            // res.redirect(`fetchAll/${}`)
        });
});



app.get('/demographic/:id', (req, res) => {
    // unirest.get('https://avenue-angelhack.herokuapp.com/doctor/fetchAllCoordinates')
    //     .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    //     .end(function (response) {
    //         // console.log(response.body.doctor.patients);
    //         // res.render('docPat.hbs',{ patData: response.body.doctor.patients });
    //         // res.send(response.body);
    //         res.render('demographic.hbs', { elements: response.coordinates });
    //     });
    res.render('demographic.hbs', {id: req.params.id});
});

app.listen (port, () => {
    console.log(`App listening on port ${port}`);
});