const request = require('request');

var geocodeAddress = (address, callback) => {
  

  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error,response,body) => {
    if(error){
      callback('Unable to connect to google servers')
    } else if(body.status === 'ZERO_RESULTS') {
      callback('Unable to find the given address');
    } else if(body.status === 'OK'){
        var geoaddress = body.results[0].geometry.location.lat + " " + body.results[0].geometry.location.lng;
        console.log('GEO: ', geoaddress);
      callback(undefined, {
        address: body.results[0].formatted_address,
        geoaddress: geoaddress
      });
    }
  });

};

module.exports = {geocodeAddress};