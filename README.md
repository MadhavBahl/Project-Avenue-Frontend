# Avenue - Server Side code

API documentation

## Routes Structure

## Base URL:
   
   `https://avenue-angelhack.herokuapp.com`

## Authentication Routes: 

### Doctor Register

- POST /authenticate/doctor/register : Parameters (name, email, password, contact)

- Response : {success: true, message: "Doctor registered successfully"}

#### For Example, calling in NodeJS,

```js
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
```

### Doctor Login

- POST /authenticate/doctor/login : Parameters (email, password)

- Response : {success: true, message: "Doctor logged in successfully", doctor: <doctor object>}

#### For Example, calling in NodeJS
```js
unirest.post('https://avenue-angelhack.herokuapp.com/authenticate/doctor/login')
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send(resp)
    .end(function (response) {
        console.log(response.body.doctor.patients);
        // res.render('docPat.hbs',{ patData: response.body.doctor.patients });
        console.log(response.body._id);
        res.redirect(`fetchAll/${response.body.doctor._id}`);
    });
```

### Disease Register

- POST /authenticate/disease/register : Parameters (name, description)

- Response : {success: true, message: "Disease registered successfully"}

#### Normal User Register

```js
POST /authenticate/user/register : Parameters (name, address, geoaddress, email, password, contact)
Response : {success: true, message: "User registered successfully"}
```

#### Normal User Login

```js
POST /authenticate/user/login : Parameters (email, password)
Response : {success: true, message: "User logged in successfully", user: <user object>}
```

### Doctor Routes:

#### Close a case

```js
- POST /doctor/closeCase/:patId/:docId : URL Parameters (patientId, doctorId)
- Response : {success: true, message: "Case closed successfully"}
```

#### Fetch all patients of a specific doctor

```js
- POST /doctor/fetchAllPatients/:id : URL Parameters (doctorId)
- Response: {success: true, message: "Fetched all the patients", patients: <Array of patient objects>}
```

#### Fetch geocoordinates of all the open cases

```js
- GET /doctor/fetchAllCoordiantes
- Response: {success: true, message: "Coordinates fetched successfully", coordinates: <Array of filtered objects containing the geocoordinates>}
```

### Open a case by a specific doctor

- POST /doctor/openCase/:docId : URL Parameters (doctorId), Parameters (name, address, geoaddress, email, contact, disease_name, disease_desc, img_url)

- Reponse: {success: true, message: "Patient registered successfully"}

Locate all the open cases within 4km of current location
- POST /doctor/nearbyCases : Parameters (current_lat, current_long)
- Response: {success: true, message: "Fetched the cases within 4km", cases: <Array of cases within 4km>}

#### For Example, in NodeJS

```js
unirest.post(`https://avenue-angelhack.herokuapp.com/doctor/openCase/${objId}`)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send(sendObj)
    .end(function (response) {
        
        res.redirect(`/createdPat/${objId}`);
        // res.redirect(`fetchAll/${}`)
    });
```

## Follow the following steps

1. Clone the repo (Either `git clone` or download the repo)

2. `npm install`

3. `npm start`


## USP

1. Sell as a product

2. Sell as a service
