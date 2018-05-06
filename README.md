# Avenue - Server Side code

API documentation

## Routes Structure

**=> Base URL:**
   https://avenue-angelhack.herokuapp.com

**=> Authentication Routes:**

Doctor Register
- POST /authenticate/doctor/register : Parameters (name, email, password, contact)
- Response : {success: true, message: "Doctor registered successfully"}

Doctor Login
- POST /authenticate/doctor/login : Parameters (email, password)
- Response : {success: true, message: "Doctor logged in successfully", doctor: <doctor object>}

Disease Register
- POST /authenticate/disease/register : Parameters (name, description)
- Response : {success: true, message: "Disease registered successfully"}

Normal User Register
- POST /authenticate/user/register : Parameters (name, address, geoaddress, email, password, contact)
- Response : {success: true, message: "User registered successfully"}

Normal User Login
- POST /authenticate/user/login : Parameters (email, password)
- Response : {success: true, message: "User logged in successfully", user: <user object>}


**=> Doctor Routes:**

Close a case
- POST /doctor/closeCase/:patId/:docId : URL Parameters (patientId, doctorId)
- Response : {success: true, message: "Case closed successfully"}

Fetch all patients of a specific doctor
- POST /doctor/fetchAllPatients/:id : URL Parameters (doctorId)
- Response: {success: true, message: "Fetched all the patients", patients: <Array of patient objects>}

Fetch geocoordinates of all the open cases
- GET /doctor/fetchAllCoordiantes
- Response: {success: true, message: "Coordinates fetched successfully", coordinates: <Array of filtered objects containing the geocoordinates>}

Open a case by a specific doctor
- POST /doctor/openCase/:docId : URL Parameters (doctorId), Parameters (name, address, geoaddress, email, contact, disease_name, disease_desc, img_url)
- Reponse: {success: true, message: "Patient registered successfully"}

Locate all the open cases within 4km of current location
- POST /doctor/nearbyCases : Parameters (current_lat, current_long)
- Response: {success: true, message: "Fetched the cases within 4km", cases: <Array of cases within 4km>}

## Follow the following steps

1. Clone the repo (Either `git clone` or download the repo)

2. `npm install`

3. `npm start`


## USP

1. Sell as a product

2. Sell as a service
