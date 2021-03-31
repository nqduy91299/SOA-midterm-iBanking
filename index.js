const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const loginRouter = require('./routes/routeLogin');
const dashboardRouter = require("./routes/routeDashboard");
const otpRouter = require("./routes/routeOtp");
const auth = require('./utils/auth');
const path = require('path')

const renderRouter = require('./routes/routeRender')

const exphbs = require('express-handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use("/", loginRouter)
app.use("/dashboard", auth, dashboardRouter)
app.use("/otp", auth, otpRouter)

// for frontend
app.use("/home", renderRouter)
app.use((req, res) => {
    res.render('error');
})


mongoose.connect('mongodb://localhost:27017/iBanking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
app.listen(8080, () => {
    console.log("Example app listening at http://localhost:8080" )})