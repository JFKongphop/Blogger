const express = require('express');
const router2 = express.Router();
const multer = require('multer');

// use model to show on database
const Blogger = require('../models/blog')


// go to home page
router2.get('/', (req, res)=>{

    // show data on home page
    Blogger.find().exec((err, doc)=>{
        res.render('index', {blogs : doc})
    })
    
})

// admin page
router2.get('/admin', (req, res)=>{

    if(req.session.login){
        res.render('admin')
    }

    else{
        res.render('login')
    }
    
})


// manage page
router2.get('/manage', (req, res)=>{

    // when login it can go to manage
    if(req.session.login){
        Blogger.find().exec((err, doc)=>{
            res.render('manage', {blogs : doc})
        })
    }

    // if not login that go to login
    else{
        res.render('login')
    }
})

// when close that manage can use
// each page of blog
router2.get('/:id', (req, res)=>{
    
    // id page from id in database
    const blog_id = req.params.id;
    
    // find each id of the blog
    Blogger.findOne({_id : blog_id}).exec((err, doc)=>{
        console.log(doc);
        if (err) console.log(err);

        // when of th each page
        res.render('blog', {blogs : doc})
    })
})

// delete button console
router2.get('/delete/:id', (req, res)=>{

    // show id that want to delete
    console.log("delete id : ", req.params.id);

    // find that id want to delete
    Blogger.findByIdAndDelete(req.params.id, {useFindAndModify : false}).exec(err=>{
        if (err) console.log(err);

        // when deleted back to this page
        res.redirect('/manage')
    })
})



module.exports = router2