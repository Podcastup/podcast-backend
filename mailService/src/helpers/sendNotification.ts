import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'paul@adamhalasz.com', // generated ethereal user
        pass: 'BlueOcean21', // generated ethereal password
    },
});


export const sendNotification = async (email: string, event: string, tokenData=null, buttonText=null, buttonURL=null, message=null) => {
    if(event=== 'forgot password') {
        const filePath = path.join(__dirname + '/views/forgotPassword.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            url: `${buttonURL}`,
            button: `${buttonText}`
        };
        const htmlToSend = template(replacements);
        let mailOptions = {
            from: `paul@adamhalasz.com`, // sender address
            to: `${email}`, // list of receivers
            subject: 'Forgot Password', // Subject line
            text: 'The URL text', // plain text body
            html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error: ', err);
            } else {
                console.log('Message sent');
            }
        });
    }

    if(event=== 'password changed') {
        const filePath = path.join(__dirname + '/views/changedPassword.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            url: `${buttonURL}`,
            button: `${buttonText}`
        };
        const htmlToSend = template(replacements);
        let mailOptions = {
            from: `paul@adamhalasz.com`, // sender address
            to: `${email}`, // list of receivers
            subject: 'Password Changed', // Subject line
            text: 'The URL text', // plain text body
            html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error: ', err);
            } else {
                console.log('Message sent');
            }
        });
    }

    if(event=== 'upcoming event') {
        const filePath = path.join(__dirname + '/views/upcomingEvent.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            url: `${buttonURL}`,
            button: `${buttonText}`,
            UpcomingEvent: `${message}`

        };
        const htmlToSend = template(replacements);
        let mailOptions = {
            from: `paul@adamhalasz.com`, // sender address
            to: `${email}`, // list of receivers
            subject: 'Custom event Invite', // Subject line
            text: 'The URL text', // plain text body
            html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error: ', err);
            } else {
                console.log('Message sent');
            }
        });
    }


};
