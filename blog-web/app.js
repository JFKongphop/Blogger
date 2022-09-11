const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const routerPost = require('./routes/routerPost')
const routerGet = require('./routes/routerGet')
const PORT = 8081

// set up ejs to show on website
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// encode when upload data by post
app.use(express.urlencoded({extended : false}))

// use cookie parser
app.use(cookieParser())

// use session and set properties
app.use(session({secret : "mysession", resave : false, saveUninitialized : false}))

// set up router
app.use(routerPost);
app.use(routerGet)
app.use(express.static(path.join(__dirname, 'public')));

// open on browser
app.listen(PORT, ()=>{
    console.log(`Start server at port ${PORT}`);
    console.log(__dirname);
})