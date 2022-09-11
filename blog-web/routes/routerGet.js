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
    res.render('admin')
})


// manage page
router2.get('/manage', (req, res)=>{
    Blogger.find().exec((err, doc)=>{
        res.render('manage', {blogs : doc})
    })
    
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

module.exports = router2