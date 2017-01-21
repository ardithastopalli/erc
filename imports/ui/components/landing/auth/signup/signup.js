import './signup.html';

Template.signup.events({
        'submit #signup-form': (event, template) => {
        event.preventDefault();


        let email = event.target.email.value;
        let password = event.target.password.value;
        // let passwordConfirm = event.target.passwordConfirm.value;

        
            Accounts.createUser({
                email: email,
                password: password,
                profile: {
                    role: 'user',
                    
                }
            }, function (err) {
                if (err) {
                    sAlert.error(err.reason);
                } else {
                    FlowRouter.go('/');
                    console.log('dggdgdgd');
                }
                
            });
        } 

  
})