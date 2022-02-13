const nodemailer = require('nodemailer');
const sendEmail =  async(email, subject, text)=>{
    try {
        console.log("Trying to send mail")
       const transporter =  nodemailer.createTransport({
            service:"gmail",
            port:587,
            auth:{
                user:"kondapuramharsha@gmail.com",
                pass:"roytamaigvtjgafy",
            },
        });

        await transporter.sendMail({
            from:"kondapuramharsha@gmail.com",
            to:email,
            subject:subject,
            text:text,
        });
        console.log("Verification mail sent successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;