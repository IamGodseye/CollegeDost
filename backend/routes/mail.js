const nodemailer = require('nodemailer');
const Token = require('../models/resetToken');
const trans =  nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"harshitr2001@gmail.com",
        pass:"Harshit@123"
    }
});

module.exports.sendResetEmail = async(email,token)=>{
    const url = "http://localhost:4000";
}

module.exports.sendVerificationEmail = async(email,token)=>{
    const url = "http://localhost:4000/user/verifyEmail?token="+token;
    console.log(url);

    await trans.sendMail({
        from:"Email",
        to:email,
        subject:"Verify Your Account | College Dost",
        text:`Click This Link To Verify Your Account : <a href=${url}>Verify</a>`,
        html:`<h3>
        Click This Link To Verify Your Account : <a href=${url}>Verify</a>
        </h3>`
    })
}