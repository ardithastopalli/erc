

Template.registerHelper('ifNotEmpty', function (item, options) {
    if (item) {
        if (item instanceof Array) {
            if (item.length > 0) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        } else {
            if (item.fetch().length > 0) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    } else {
        return options.inverse(this);
    }
});


Template.registerHelper('isOperatorById', function (id) {
   let isOperator = Meteor.users.findOne({
        _id: userId
    }).profile.role == "operator";

    if (isOperator) return true;
    else return false;
});

Template.registerHelper('isUserById', function (userId) {
    let isUser = Meteor.users.findOne({
        _id: userId
    }).profile.role == "user";

    if (isUser) return true;
    else return false;
});

Template.registerHelper('isAdminById', function (userId) {
    let isAdmin = Meteor.users.findOne({
        _id: userId
    }).profile.role == "admin";

    if (isAdmin) return true;
    else return false;
});


/*
    usage:
    {{ #if isApprovedById _id }} {{ /if}}
*/
// Template.registerHelper('isApprovedById', function (userId) {
//     let isApproved = Meteor.users.findOne({
//         _id: userId
//     }).profile.status == "APPROVE";

//     if (isApproved) return true;
//     else return false;
// });

// Template.registerHelper('isSponsorApprovedById', function (userId) {
//     let isApproved = Sponsor.findOne({
//         _id: userId
//     }).profile.status == "APPROVE";

//     if (isApproved) return true;
//     else return false;
// });

/*
    usage:
    {{ #if isApprovedById _id }} {{ /if}}
*/
// Template.registerHelper('isDeniedById', function (userId) {
//     let isApproved = Meteor.users.findOne({
//         _id: userId
//     }).profile.status == "DENY";

//     if (isApproved) return true;
//     else return false;
// });

// Template.registerHelper('isSponsorDeniedById', function (userId) {
//     let isApproved = Sponsor.findOne({
//         _id: userId
//     }).profile.status == "DENY";

//     if (isApproved) return true;
//     else return false;
// });

/*
    usage:
    {{ #if isApprovedById _id }} {{ /if}}
*/
// Template.registerHelper('isOnRevisionById', function (userId) {
//     let isApproved = Meteor.users.findOne({
//         _id: userId
//     }).profile.status == "ON_REVISION";

//     if (isApproved) return true;
//     else return false;
// });

Template.registerHelper('equals', function (a, b) {
      return a === b;
    });

// Template.registerHelper('isSponsorOnRevisionById', function (userId) {
//     let isApproved = Sponsor.findOne({
//         _id: userId
//     }).profile.status == "ON_REVISION";

//     if (isApproved) return true;
//     else return false;
// });

Template.registerHelper('equals', function (a, b) {
    return a === b;
});

// Template.registerHelper('shortIt', function(stringToShorten, maxCharsAmount){
//   if(stringToShorten.length > maxCharsAmount){
//     return stringToShorten.substring(0, maxCharsAmount) + '...';
//   }
//   return stringToShorten;
// });