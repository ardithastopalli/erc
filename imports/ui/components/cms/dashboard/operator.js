import {
  ReactiveVar
} from 'meteor/reactive-var';

import './operator.html';
var MAP_ZOOM = 15;

Meteor.startup(function () {
  GoogleMaps.load();
  GoogleMaps.load({
    v: '3',
    key: 'AIzaSyB43jqX0FX8RVFLVBaSH-94VtNhUcSy8So',
    libraries: 'geometry,places,directions'
  });
});

// Template.operatorDashboard.onCreated(function() {
//   // We can use the `ready` callback to interact with the map API once the map is ready.
//   GoogleMaps.ready('map', function(map) {
//     // Add a marker to the map once it's ready
//     var marker = new google.maps.Marker({
//       position: map.options.center, // new google.maps.LatLng(45.4775856, 9.2060199)
//       map: map.instance
//     });
//     let myLatitude = marker.position.lat();
//     let myLongitude = marker.position.lng();
// 		$('[name="latitude"]').val(marker.position.lat());
// 		$('[name="longitude"]').val(marker.position.lng());

// // $('[name="latitude"]').val(myLongitude);

//   console.log(myLatitude,myLongitude);
//   });
  
// });


Template.operatorDashboard.onCreated(function() {  
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      var latLng = Geolocation.latLng();
      if (! latLng)
        return;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });
		
        // marker2 = new google.maps.Marker({
            
        //     position: new google.maps.LatLng($('#lat').val(),$('#lang').val()),
        //     map: map.instance
        //   });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }
      console.log(latLng);
       myLatitude = marker.position.lat();
         myLongitude = marker.position.lng();
         myLatLng = new google.maps.LatLng(myLatitude,myLongitude);

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      // map.instance.setZoom(MAP_ZOOM);
    });
  });
});

function calculateAndDisplayRoute(service, display) {
   destLatitude = $('#lat').val();
         destLongtitude = $('#lang').val();
         destLatLng = new google.maps.LatLng(destLatitude, destLongtitude );
         console.log(destLatLng);
    directionsService.route({
      origin: myLatLng,
      destination: destLatLng,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
          console.log('Directions request failed due to ' + status);
        }
    });
  }


Template.operatorDashboard.events({
	'click #get-route': function (event) {
    event.preventDefault();
     var map = GoogleMaps.maps.map.instance;
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('panel'));
//      var totalDistance = 0;
// var totalDuration = 0;
// var legs = directionsResult.routes[0].legs;
// for(var i=0; i<legs.length; ++i) {
//     totalDistance += legs[i].distance.value;
//     totalDuration += legs[i].duration.value;
// }
//      $('#distance').text(totalDistance);
// $('#duration').text(totalDuration);


  },

});

Template.operatorDashboard.helpers({
	 users() {
        return Meteor.users.find({
            'profile.role': 'user'

        })
    },
    geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
   
  },

});

Template.operatorDashboard.onRendered(function (){
	GoogleMaps.load();
	 var table = $('#user-table').DataTable();
     
    $('#user-table tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        // alert( 'You clicked on '+data[0]+'\'s row' );
        console.log(data[4],data[5],this.userId)
        $('[name="lat"]').val(data[4]);
        $('[name="lang"]').val(data[5]);
        let lat = $('#lat').val();
		let lang = $('#lang').val(); 
		console.log("this is lat" + lat);      
		console.log("this is lang" + lang);


 		GoogleMaps.ready('map', function(map) {
		marker2 = new google.maps.Marker({
            
            position: new google.maps.LatLng($('#lat').val(),$('#lang').val()),
            map: map.instance
          });

    } );
 		
});
});


