import '../../ui/body.js';

// import Security from '/imports/api/security.js';

/*
  Public Routes

*/


FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "landingHome" });
    }
});
FlowRouter.route('/signup', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "signup" });
    }
});
FlowRouter.route('/login', {
    action: function () {
        BlazeLayout.render("mainLayout", { content: "login" });
    }
});


var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',

    // this trigger runs before entering the route
    triggersEnter: [
        function () {
            // set session variable
            let route;
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                route = FlowRouter.current();
                if (route.route.name !== 'login') {
                    Session.set('redirectAfterLogin', route.path);
                }
                return FlowRouter.go('/auth/login');
            }

            // check the session variable 
            // if user is loggedin
            Accounts.onLogin(function () {
                let redirect = Session.get('redirectAfterLogin');
                if (redirect != null) {
                    if (redirect !== '/login') {
                        return FlowRouter.go(redirect);
                    }
                }
            });
        }
    ]
}); // adminRoutes()


adminRoutes.route('/dashboard', {
    action: function () {
        BlazeLayout.render("cmsLayout", { content: "adminDashboard" });
    }
});

adminRoutes.route('/manage', {
    action: function () {
        BlazeLayout.render("cmsLayout", { content: "adminManage" });
    }
});


adminRoutes.route('/manage/blog', {
    action: function () {
        BlazeLayout.render("cmsLayout", { content: "manageBlog" });
    }
});


adminRoutes.route('/contact', {
    action: function () {
        BlazeLayout.render("cmsLayout", { content: "contactAdmin" });
    }
});

adminRoutes.route('/profile', {
    action: function () {
        BlazeLayout.render("cmsLayout", { content: "userProfile" });
    }
});

adminRoutes.route('/ep/:epId', {
    action: function (params, queryParams) {
        BlazeLayout.render("cmsLayout", { content: "adminViewEP" });
    }
});

var userRoutes = FlowRouter.group({
    prefix: "/user",
    name: "user",
    // this trigger runs before entering the route
    triggersEnter: [
        function () {
            // set session variable
            let route;
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                route = FlowRouter.current();
                if (route.route.name !== 'login') {
                    Session.set('redirectAfterLogin', route.path);
                }
                return FlowRouter.go('/login');
            }

            // check the session variable 
            // if user is loggedin
            Accounts.onLogin(function () {
                let redirect = Session.get('redirectAfterLogin');
                if (redirect != null) {
                    if (redirect !== '/login') {
                        return FlowRouter.go(redirect);
                    }
                }
            });


        }
    ]
});

userRoutes.route('/dashboard', {
    action: function () {
        BlazeLayout.render("cmsLayout", { content: "userDashboard" });
    }
});
userRoutes.route('/profile', {
    action: function () {
        BlazeLayout.render("cmsLayout", { content: "userDashboard" });
    }
});


// FlowRouter.route( '/verify-email/:token', {
//   name: 'verify-email',
//   action( params ) {
//     Accounts.verifyEmail( params.token, ( error ) =>{
//       if ( error ) {
//         Bert.alert( error.reason, 'danger' );
//       } else {
//         FlowRouter.go( '/' );
//         sAlert.success( 'Email verified! Thanks!', 'success' );
//       }
//     });
//   }
// });