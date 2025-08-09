const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendEmail = async (to, subject, body, html) => {
    try {
        const emailInformation = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            body: body,
            html: html
        };

        await transporter.sendMail(emailInformation);
        console.log(`Email sent successfully to ${to}`);
    } catch (error){
        console.log(`Error sending email to ${to}: `, error);
    }
};
