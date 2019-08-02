const sgMail = require('@sendgrid/mail')

const sendgridAPIKEY = process.env.SENDGRID_API
sgMail.setApiKey(sendgridAPIKEY)

sgMail.send({
    to: 'nprasad4b6@getMaxListeners.com',
    from: 'nprasad4b6@gmail.com',
    subject: 'hello',
    text: 'this is text'
})