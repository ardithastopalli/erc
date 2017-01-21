import './admin.html';




Template.adminDashboard.helpers({
adminCount() {
        return Meteor.users.find({
            'profile.role': 'admin'
        }).count();
    },
    operatorCount() {
        return Meteor.users.find({
            'profile.role': 'operator'
        }).count();
    },
    userCount() {
        return Meteor.users.find({
            'profile.role': 'user'
        }).count();
    },
});






