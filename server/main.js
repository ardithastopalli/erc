import { Meteor } from 'meteor/meteor';
import '../imports/api/user/methods.js';


Meteor.startup(() => {
   process.env.MAIL_URL = "smtp://postmaster%40sandbox6c62412b6d5047f6b41d7b4b85437796.mailgun.org:035ab804d2bf48325302466356ea6e44@smtp.mailgun.org:587";
     
     if (Meteor.users.find().count() === 0) {
            Accounts.createUser({
                  email: 'admin@gmail.com',
                  password: 'Admin1',
                  profile: {
                        role: 'admin',
                        firstname: 'Admin',
                        lastname: 'Admin'
                  }
            });
      }

      // Accounts.emailTemplates.resetPassword.text = function (user, url) {
      //       var token = url.substring(url.lastIndexOf('/') + 1, url.length);
      //       var newUrl = Meteor.absoluteUrl('reset-password/' + token);
      //       var str = 'Hello, \n';
      //       str += 'Click on the following link to reset your password \n';
      //       str += newUrl;
      //       return str;
      // };



});



Accounts.onCreateUser(function (options, user) {
      
      var newEmail = user.emails[0].address

      console.log(newEmail)

      var emailAlreadyExist = Meteor.users.find({ "emails.address": newEmail }, { limit: 1 }).count() > 0

      console.log(emailAlreadyExist + ' already exists')

      if (emailAlreadyExist === true) {
            throw new Meteor.Error(403, "email already registered");
      }
      else {
            profile = options.profile
            profile.nameOfArray = []
            user.profile = profile

            return user
      }

})
