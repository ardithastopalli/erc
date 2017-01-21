
Meteor.startup(() => {
   process.env.MAIL_URL = "smtp://postmaster%40sandbox6c62412b6d5047f6b41d7b4b85437796.mailgun.org:035ab804d2bf48325302466356ea6e44@smtp.mailgun.org:587";
})
Accounts.emailTemplates.siteName = "GoDunk";
Accounts.emailTemplates.from     = "GoDunk <admin@godunk.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[GoDunk] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@godunk.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};
