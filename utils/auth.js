const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    let authHeader = req.headers.authorization
    // console.log(authHeader)

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // console.log(token)

        jwt.verify(token, "SOA", (err, user) => {
            if (err) {
                return res.json({code: 4, msg: "Lỗi token"});
            }
            req.username = user.username;
            next();
        });
    } else {
        res.json({code: 4, msg: "Unauthorized"})
    }
}

module.exports = auth