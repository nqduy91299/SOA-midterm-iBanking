const express = require('express');
const { route } = require('./routeDashboard');
const router = express.Router();
const User  = require("../utils/UserSchema")
const Fee = require("../utils/FeeSchema")
const Transporter = require("../utils/mailer")

router.post("/", async function(req, res){
    let result, tuition
    try{
        result = await User.findOne({username: req.username})
        tuition = await Fee.findById(req.body.id)
    }catch(error){
        return res.json({code: 4, msg: "Lỗi yêu cầu"})
    }
    if(result.otp == req.body.otp && result.transcurr === req.body.id){
        if(result.expires.getTime() < new Date().getTime()){
            return res.json({code: 4, msg: "OTP đã hết hạn"})
        }else if (tuition.paid === tuition.fee || result.balance < (tuition.fee - tuition.paid)){
            return res.json({code: 4, msg: "Thanh toán học phí thất bại"})
        }else{
            Fee.findByIdAndUpdate(req.body.id, {paid: tuition.fee})
            .then(success =>{
                if (success){
                    User.findOneAndUpdate({username: req.username}, {balance: (result.balance - tuition.fee)})
                    .then(success => {
                        if (success){
                            return res.json({code: 2, msg: "Thanh toán học phí thành công"})
                        }
                    })
                }
            })
            .catch(e => {
                return res.json({code: 4, msg: "Thanh toán học phí thất bại "+ e.message})
            })
        }
    }else{
        return res.json({code: 4, msg: "OTP không đúng"})
    }

})

// router.get("/",async function (req, res){
//     let otp = Math.floor(100000 + Math.random() * 900000)
//     let result = User.findOneAndUpdate({username: req.username}, {otp: otp, otpCreateAt: (new Date() + (60000 *5) )})
//     .then(result => {
//         let mailOptions = {
//             from: 'SOA@gmail.com',
//             to: result.email,
//             subject: 'OTP for iBanking',
//             html: '<p> Your OTP: <b>'+ otp+'</b> </p>'
//         }
//         Transporter.sendMail(mailOptions, function(error, info){
//             if(error){
//                 return res.json({code: 4, msg: "Gửi OTP thất bại"})
//             }else{
//                 return res.json({code: 2, msg: "Gửi OTP thành công"})
//             }
//         })
        
//     })
//     .catch(e => {
//         return res.json({code: 4, msg: "Nhận OTP thất bại"})
//     })
// })

module.exports = router