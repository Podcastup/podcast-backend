import nodemailer from 'nodemailer';

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

export const sendMail = async (email, token) =>{
    let info = await transporter().sendMail({
        from: `"Grid 👻" <${email}>`, // sender address
        to: "paulnsereko8@gmail.com", // list of receivers
        subject: "Login Url", // Subject line
        text: "The URL text", // plain text body
        html: `
                <pre>Please see below your URL login link</pre>
                <br>
                <b>http://localhost:8000/user/login/${token}</b>
            `, // html body
    });

};
