jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    // script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDqnG5CmkFAGx_FkmvDTP2Tip3szE9ymOI&callback=initMap";
    // document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'hybrid'
     // mapTypeId: 'satellite'
        // mapTypeId: 'roadmap'
      // mapTypeId: 'terrain'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
    var markers = [
        ['Abu Dhabi', 23.4503101,53.6555362],
        ['Dubai, UAE ', 25.075677,54.9489376],
      ['Ajman, UAE ', 25.3993862,55.4603624],
      ['Fujairah, UAE ', 25.2875526,55.8887813],
      ['Sharjah', 25.3166,55.476935],
      ['Ras al-Khaimah', 25.7263233,55.827848],
      ['Umm al-Qaiwain', 25.5096566,55.5952655]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Abu Dhabi</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
         '<p>LYMO Users: 24</p>' + '<p>LYMO Drivers: 33</p>' +'</div>'],
       ['<div class="info_content">' +
        '<h3>Dubai, UAE </h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
         '<p>LYMO Users: 24</p>' + '<p>LYMO Drivers: 33</p>' +'</div>'],
      ['<div class="info_content">' +
        '<h3>Ajman, UAE</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
         '<p>LYMO Users: 24</p>' + '<p>LYMO Drivers: 33</p>' +'</div>'],
      ['<div class="info_content">' +
        '<h3>Fujairah, UAE</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
         '<p>LYMO Users: 24</p>' + '<p>LYMO Drivers: 33</p>' +'</div>'],
      ['<div class="info_content">' +
        '<h3>Sharjah</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
         '<p>LYMO Users: 24</p>' + '<p>LYMO Drivers: 33</p>' +'</div>'],
      ['<div class="info_content">' +
        '<h3>Ras al-Khaimah</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
         '<p>LYMO Users: 24</p>' + '<p>LYMO Drivers: 33</p>' +'</div>'],
      ['<div class="info_content">' +
        '<h3>Umm al-Qaiwain</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
         '<p>LYMO Users: 24</p>' + '<p>LYMO Drivers: 33</p>' +'</div>']
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(7);
        google.maps.event.removeListener(boundsListener);
    });
    
}