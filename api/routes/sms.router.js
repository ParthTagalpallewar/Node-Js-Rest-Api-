"use strict"

module.exports = app => {

    app.use('/sendSms',(req,res)=>{

        const twilioConfig = require('../config/twilio.config.js');

        const accountSid = twilioConfig.TWILIO_ACCOUNT_SID;
        const authToken =  twilioConfig.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

       // console.log(accountSid + "  " + authToken + "  " + twilioConfig.MY_PHONE_NUMBER);

        client.messages
            .create({
                body: 'Message form twilio',
                from: twilioConfig.MY_PHONE_NUMBER,
                to: '+919146510960'
             })
            .then(message => console.log(message.body +  "   " ));
         })

}