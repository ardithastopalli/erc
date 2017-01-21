import './navbar.html';

Template.landingNavbar.events({
    'click .logout': function (event) {
        event.preventDefault();

        Meteor.logout(function (error) {
            if (error) {
                sAlert.error( error.reason);
            }
            FlowRouter.go('/');
        });
    }
});
Template.landingNavbar.helpers({
    navbar() {
        return Homepage.findOne({}) || {};
    }
});