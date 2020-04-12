import nodemailer from 'nodemailer';
const dotEnv = require("dotenv");
dotEnv.config();

export const transporter = () =>{
    // create reusable transporter object using the default SMTP transport
    return nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: 'paulnsereko8@gmail.com', // generated ethereal user
            pass: 'rasengan1408'// generated ethereal password
        }
    });

};

export const sendMail = async (email, token, subject) =>{
    let info = await transporter().sendMail({
        from: `"Podcaster 👻" <paulnsereko@gmail.com>`, // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: "The URL text", // plain text body
        html: `
                <pre>Please see below your URL login link</pre>
                <br>
                <b>http://localhost:8000/user/login/${token}</b>
            `, // html body
    });

};
