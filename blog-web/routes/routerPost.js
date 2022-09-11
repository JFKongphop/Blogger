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


// login page



module.exports = router