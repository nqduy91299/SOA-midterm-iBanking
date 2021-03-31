const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hoanglegf8625@gmail.com',
      pass: 'Vuong2310'
    }
  });

module.exports = transporter