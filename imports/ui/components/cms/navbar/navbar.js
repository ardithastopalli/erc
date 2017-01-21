import './navbar.html';

Template.cmsNavbar.events({
    'click .logout': function (event) {
        event.preventDefault();

        Meteor.logout(function (error) {
            if (error) {
                console.log("ERROR: " + error.reason);
            }
            FlowRouter.go('/');
        });
    }
});


