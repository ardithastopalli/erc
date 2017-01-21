Meteor.startup(function () {
    sAlert.config({
        effect: 'stackslide',
        position: 'top-right',
        timeout: 3000,
        html: false,
        onRouteClose: true,
        stack: {
            spacing: 10, // in px
            limit: 3 // when fourth alert appears all previous ones are cleared
        },
        offset: 150, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        onClose: _.noop //
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });

});