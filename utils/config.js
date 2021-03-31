const User = require("./UserSchema")
const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const Fee = require("./FeeSchema");
mongoose.connect('mongodb://localhost:27017/iBanking?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const fee1 = new Fee({username: "hienvuong12", name: "Phan Thái Hiền Vương", fee: 500000, feename: "Hoc phi HK 1", paid: 0});
const fee2 = new Fee({username: "hienvuong12", name: "Phan Thái Hiền Vương", fee: 450000, feename: "Hoc phi HK 2", paid: 0});
const fee3 = new Fee({username: "hienvuong12", name: "Phan Thái Hiền Vương", fee: 460000, feename: "Hoc phi HK 3", paid: 0});
const fee4 = new Fee({username: "quocduy12", name: "Nguyễn Quốc Duy", fee: 460000, feename: "Hoc phi HK 3", paid: 0});
const user1 = new User({
    username: 'hienvuong12', 
    password: bcrypt.hashSync('123123123', 10),
    name: 'Phan Thái Hiền Vương', 
    email: 'hienvuong@gmail.com', 
    phone: '0252132652',
    balance: 100000000  });
const user2 = new User({
    username: 'quocduy12', 
    password: bcrypt.hashSync('123123123', 10),
    name: 'Nguyễn Quốc Duy', 
    email: 'quocduy12@gmail.com', 
    phone: '0236595214',
    balance: 100000000  });
const user3 = new User({
    username: 'ducthang12', 
    password: bcrypt.hashSync('123123123', 10),
    name: 'Lý Đức Thắng', 
    email: 'ducthang12@gmail.com', 
    phone: '0126591232',
    balance: 100000000  });

fee1.save()
fee2.save()
fee3.save()
fee4.save()
user1.save()
user2.save()
user3.save()