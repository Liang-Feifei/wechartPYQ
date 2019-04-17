const express = require('express');
const mongoose = require('mongoose');
const db = require("./config/keys").mongonURI;
const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles");
const bodyParser = require("body-parser");
const passport = require("passport");


const app = express();

//限制图片大小，50M
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(passport.initialize());
require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.get("/",(req,res) => {
    res.send('hello world!');
})

app.use("/api/users",users);
app.use("/api/profiles",profiles);

mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => {
        console.log('连接成功了!')
    })
    .catch(err => {
        console.log(err)
    })

app.listen(port,() => {
    console.log(`server running on port ${port}`);
})