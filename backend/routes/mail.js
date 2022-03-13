const nodemailer = require('nodemailer');
const Token = require('../models/resetToken');
const trans =  nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"harshitrathi200105@gmail.com",
        pass:"kwjoyehfmxzzzugo"
    }
});

module.exports.sendResetEmail = async(url,email)=>{

    await trans.sendMail({
        from:"Email",
        to:email,
        subject:"Verify Your Account",
        text:`Click This Link To Verify Your Account : ${url}`,
        html:`<h3>
        Click This Link To Verify Your Account : ${url}
        </h3>`
    }).then((s) => {
        console.log(s);
    })
}

module.exports.sendVerificationEmail = async(email,token)=>{
    const url = "http://localhost:4000/user/verifyEmail?token="+token;
    console.log(url);

    await trans.sendMail({
        from:"Email",
        to:email,
        subject:"Verify Your Account",
        text:`Click This Link To Verify Your Account : ${url}`,
        html:`<h3>
        Click This Link To Verify Your Account : ${url}
        </h3>`
    })
}