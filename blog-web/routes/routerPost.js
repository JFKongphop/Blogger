const express = require('express');
const router = express.Router();
const multer = require('multer');

// use model to show on database
const Blogger = require('../models/blog')

// save and rename image to database
const storage = multer.diskStorage({

    // set position to save image
    destination : function(req, res, cb){
        cb(null, './public/images/titleImgs')
    },

    // set file name
    filename : function(req, res, cb){
        cb(null, Date.now() + ".jpg")
    }
})

// upload to image folder
const upload = multer({
    storage : storage
})

// insert data to database
router.post('/insert', upload.single('image'), (req, res)=>{

    // show after input of the data
    console.log(req.body);

    // put data to object from admin=
    let data = new Blogger({
        title : req.body.title,
        date : req.body.date,
        description : req.body.description,

        // when upload file that are different from string or number
        image : req.file.filename,

        content : req.body.content
    })

    // save data to database
    Blogger.saveProduct(data, err=>{
        
        if(err) console.log(err);
        
        // when it finish back to home page
        res.redirect('/')
    })    
})

// edit page
router.post('/edit', (req, res)=>{

    // get id of this blog when will edit
    const edit_id = req.body.edit_id
    console.log(edit_id);

    // find one of the blog to change it
    Blogger.findOne({_id : edit_id}).exec((err, doc)=>{
        if (err) console.log(err);

        res.render('edit', {blog : doc})
    })
})

// update when clike in edit page
router.post('/update', (req, res)=>{

    // id that will update of blog
    const update_id = req.body.update_id

    // set same object not create new class
    let data = {
        title : req.body.title,
        description : req.body.description,
        content : req.body.content
    }

    // update of the same id and new data
    Blogger.findByIdAndUpdate(update_id, data, {useFindAndModify : false}).exec(err=>{
        if (err) console.log(err)

        // and back to manage page
        res.redirect('/manage')
    })
})


// login page
router.post('/login', (req, res)=>{

    // set session to login
    // get username and password from login
    const username = req.body.username
    const password = req.body.password

    // set time to expire
    const timeExpire = 30000

    if(username === "admin" && password === "123"){

        // send value to access the page
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire

        // go to manage page when it true
        res.redirect('/manage')
    }
 
    // not found cus not admin
    else{
        res.render('404')
    }
})

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/admin')
    })
})



module.exports = router