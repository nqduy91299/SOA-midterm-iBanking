const express = require('express');
const router = express.Router();
const User  = require("../utils/UserSchema")
const Fee = require("../utils/FeeSchema")
const Transporter = require("../utils/mailer")

router.get("/", async function (req, res){
    let result = await User.findOne({username: req.username}).select(["username", "name", "balance", "email", "phone"])
    if(result){
        return res.json({code: 2, msg: result})
    }else{
        return res.json({code: 4, msg: "Không tìm thấy thông tin người dùng"})
    }
    
})

router.get("/fee", async function(req, res){
    let infoFeeUser = req.headers?.username
    
    let resultAccount = await User.find({username: infoFeeUser});
    if(resultAccount.length == 0){
        return res.json({code: 4, msg: "Username không tồn tại"})
    }else{
        let result = await Fee.find({username: infoFeeUser}).select(["-__v"])
        if(result){
            return res.json({code: 2, msg: result})
        }else{
            return res.json({code: 4, msg: "Không tìm thấy thông tin học phí"})
        }
    }
})

router.post("/fee", async function(req, res){
    let tuition
    try{
        tuition = await Fee.findById(req.body.id)
    }catch (error) {
        return res.json({code: 4, msg: "Lỗi yêu cầu"})
    }
    let balance = await User.findOne({username: req.username});
    if(tuition?.paid === tuition?.fee){
        return res.json({code: 3, msg: "Đã chi trả học phí"})
    }else if (balance.balance < (tuition.fee - tuition.paid)){
        return res.json({code: 3, msg: "Không đủ số dư trong tài khoản"})
    }else if (balance.balance >= (tuition.fee - tuition.paid)){
        let otp = Math.floor(100000 + Math.random() * 900000)
        let result = User.findOneAndUpdate({username: req.username}, {otp: otp, expires: (new Date(new Date().getTime() + 300000)), transcurr: req.body.id})
        .then(response => {
            let mailOptions = {
                from: 'SOA@gmail.com',
                to: response.email,
                subject: 'OTP for iBanking',
                html: '<p> Your OTP: <b>'+ otp+'</b> </p>'
            }
            Transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return res.json({code: 4, msg: "Gửi OTP thất bại"})
                }else{
                    return res.json({code: 2, msg: "Gửi OTP thành công"})
                }
            })
        })
        .catch(e => {
            return res.json({code: 4, msg: "Nhận OTP thất bại"})
        })
    }
})

module.exports = router