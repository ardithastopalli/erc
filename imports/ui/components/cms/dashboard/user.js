import './user.html';




Template.userDashboard.events({
'submit #save-user': function (event,template) {
        event.preventDefault();
  
        let userData = {
            role: 'user',
            firstName: template.$('#first-name').val(),
            lastName: template.$('#last-name').val(),
            phone : template.$('#phone').val(),
            lat: template.$('#latitude').val(),
            long: template.$('#longitude').val(),
						sos: template.$('#sos').val(),
            photo: template.$('#profile-sponsor-base64').val(),

        }
				console.log(userData);

        // TODO: also check if there is at least a project and a cv entered
        Meteor.call('user_profile', userData, function (err, success) {
            if (err) {
                sAlert.error(err.reason);
            } else {
               sAlert.success('Your message');
                
                
            }
        });
        


    },

'change #profile-photo': function(event) {
    event.preventDefault();

    if (event.currentTarget.files && event.currentTarget.files[0]) {
        // var file = event.currentTarget.files[0];
				var file = new FileReader();
			
				file.onload = function(e){
				document.getElementById("profile-sponsor-base64").value= e.target.result;
				$('#profile-sponsor').attr('src', e.target.result);
        // file.convertToBase64 = function(base64) {
        //     $('#profile-sponsor-base64').val(base64);
        //     $('#profile-sponsor').attr('src', base64);
        // }
    }
		file.readAsDataURL( event.currentTarget.files[0] );

    // get the image base64 and set in a hidden input 
    // so that we can get it in form submit 


    // show the uploaded image on the right
}
}
})

var MAP_ZOOM = 15;

Meteor.startup(function () {
  GoogleMaps.load({
    v: '3',
    key: 'AIzaSyB43jqX0FX8RVFLVBaSH-94VtNhUcSy8So',
    libraries: 'geometry,places,directions'
  });
});

Template.userDashboard.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center, // new google.maps.LatLng(45.4775856, 9.2060199)
      map: map.instance
    });
    let myLatitude = marker.position.lat();
    let myLongitude = marker.position.lng();
		$('[name="latitude"]').val(marker.position.lat());
		$('[name="longitude"]').val(marker.position.lng());

// $('[name="latitude"]').val(myLongitude);

  console.log(myLatitude,myLongitude);
  });
  
});


Template.userDashboard.helpers({  
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
  
	user() {

        return Meteor.users.findOne({
            _id: Meteor.userId()

        })

    },
    email() {
        return Meteor.user().emails[0].address;
    },
});


Template.userDashboard.onRendered(function () {
	GoogleMaps.load();
	console.log(Meteor.userId());

	// $('#contact-form').validate({
	// 	rules: {
	// 		firstname: {
	// 			required: true,
				
	// 			minlength: 2
	// 		},
	// 		lastname: {
	// 			required: true,
	// 			pattern: "(?=^.{2,}$)(?=.*[a-z]).*"
	// 		},
	// 		phone: {
	// 			required: true,
	// 			number: true
	// 		},
	// 		email: {
	// 			required: true,
	// 			email: true
	// 		},
	// 		title: {
	// 			required: true,
	// 			pattern: "(?=^.{1,}$)(?=.*[a-z]).*"
	// 		},
	// 		subject: {
	// 			required: true,
	// 			pattern: "(?=^.{4,}$)(?=.*[a-z]).*"
	// 		},
	// 		checkbox: {
	// 			required: true
	// 		},
	// 		checkbox1: {
	// 			required: true
	// 		}
	// 	},
	// 	//fix the error of the message when it gets alined with the span element
	// 	highlight: function (element) {
	// 		$(element).closest('.form-group').addClass('has-error');
	// 	},
	// 	unhighlight: function (element) {
	// 		$(element).closest('.form-group').removeClass('has-error');
	// 	},
	// 	errorElement: 'span',
	// 	errorClass: 'help-block',
	// 	errorPlacement: function (error, element) {
	// 		if (element.parent('.input-group').length) {
	// 			error.insertAfter(element.parent());
	// 		} else {
	// 			error.insertAfter(element);
	// 		}
	// 	},
	// 	messages: {
	// 		firstname: {
	// 			required: "Campo obbligatorio.",
	// 			minlength: "Il minimo di inserire e due caratteri"
				
	// 		},
	// 		lastname: {
	// 			required: "Campo obbligatorio.",
	// 			pattern: "Il minimo di inserire e due caratteri",
	// 		},
	// 		phone: {
	// 			required: "Campo obbligatorio.",
	// 			number: "Inserire solo contatti telefonici.",
	// 		},
	// 		email: {
	// 			required: "Campo obbligatorio.",
	// 			pattern: "Invalido.",
	// 		},
	// 		title: {
	// 			required: "Campo obbligatorio.",
	// 			pattern: "Il minimo di inserire e un carattere.",
	// 		},
	// 		subject: {
	// 			required: "Campo obbligatorio.",
	// 			pattern: "Il minimo di inserire e quatro caratteri.",
	// 		},
	// 		checkbox: {
	// 			required: "Campo obbligatorio.",
	// 		},
	// 		checkbox1: {
	// 			required: "Campo obbligatorio.",
	// 		}
	// 	},

	// });
});

