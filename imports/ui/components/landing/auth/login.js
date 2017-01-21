import './login.html';

Template.login.events({
    'submit #login-form': function (event) {
        event.preventDefault();
        // Getting values from fields on page
        let email = event.target.email.value;
        let password = event.target.password.value;


        // Calling the loginWithPassword function on the user
        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                // Returning an error with salert
                sAlert.error('Wrong email or password.');
            } else {
                let user = Meteor.users.findOne({
                    "_id": Meteor.userId()
                }, {
                        fields: {
                            "profile.role": 1,
                            
                        }
                    })
                let userRole = user.profile.role;
               
                if (userRole) {
                    switch (userRole) {
                        case "admin":
                            FlowRouter.go('/admin/dashboard');
                            break;
                        case "user":
                            FlowRouter.go('/user/dashboard');
                            break;
                        case "operator":
                            FlowRouter.go('/operator/dashboard');
                            break;
                        default:
                            alert('Non authorized');
                            break;
                    }
                } 


            }
        });
        return false;
    }
});

Template.login.onRendered(function () {
    //    $('#login-form').validate({
    //     rules: {
    //       email: {
    //         required: true,
    //         email: true
    //       },
    //       password: {
    //         required: true,
    //         pattern: "(?=^.{6,25}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*"


    //       }
    //     },
    //     messages: {
    //       email: {
    //         required: "Please enter your email address to login.",
    //         email: "Please enter a valid email address."
    //       },
    //       password: {
    //         required: "Please enter your password to login.",
    //         pattern: "Password should contain at least 1 upper case, 1 lower case, and should be longer than 6 character",
    $('#login-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                //pattern: "(?=^.{6,25}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*"
            }
        },
        //fix the error of the message when it gets alined with the span element
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        messages: {
            email: {
                required: "Indirizzo e-mail e necessario",
                email: "Indirizzo e-mail non e valido."
            },
            password: {
                required: "Password e necessario.",
                //pattern: "Password should contain at least 1 upper case, 1 lower case, and should be longer than 6 character",

            }
        },

    });
});