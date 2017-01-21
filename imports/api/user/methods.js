import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'user_profile': function (userData) {
        

        return Meteor.users.update({
            _id: Meteor.userId()
        }, {
            $set: {
                profile: {
                    role: userData.role,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phone: userData.phone,
                    lat: userData.lat,
                    long: userData.long,
                    sos:userData.sos,
                    photo: userData.photo,
                    
                }
            }
        })
    },

    

}); // methods