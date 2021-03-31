const express = require('express');
const router = express.Router();
const {validationResult} = require("express-validator")
const loginValidator = require("./validators/loginValidator")
const User = require("../utils/UserSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.get('/', function(req, res) {
  res.render("login");
});

router.post("/", loginValidator ,async function(req,res){
    let result = validationResult(req)

    if (result.errors.length === 0){
        let {username, password } = req.body
        let query = await User.findOne({username: username})
        if (query === null){
          return res.json({code: 4, msg: "Tài khoản không tồn tại"})
        }
        if (bcrypt.compareSync(password, query.password)){
          return res.json({code: 2, msg: "Đăng nhập thành công", token: jwt.sign({username: query.username},"SOA",{expiresIn: 86400})})
        }else{
          return res.json({code: 4, msg: "Sai mật khẩu"})
        }
        return res.json(query)
    }
    else{ 
      return res.json({
        code: 4,
        msg: result?.errors[0].msg
      })
    }
})

module.exports = router;
