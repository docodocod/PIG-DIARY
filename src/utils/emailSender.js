const nodemailer=require('nodemailer');
const dotenv=require('dotenv');
dotenv.config();
exports.sendEmail=(to, newPassword)=> {
    const transporter = nodemailer.createTransport({
        service: 'naver',
        auth: {
            user: 'binarycodebook@naver.com',
            pass: process.env.nodeMailer_password,
        }
    });

    const mailOptions = {
        from: 'binarycodebook@naver.com',
        to: to,
        subject: '임시 비밀번호가 발급되었습니다.',
        text: `임시 비밀번호: ${newPassword}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
};