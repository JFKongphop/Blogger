// use mongoose
const mongoose = require('mongoose');

// connect mongoDB
const dbUrl = 'mongodb://localhost:27017/blogDB';
mongoose.connect(dbUrl, {
    
    useNewUrlParser : true,
    useUnifiedTopology : true 
}).catch(err=>console.log(err))

// design Schema
let blogSchema = mongoose.Schema({

    title : String,
    Date : String,
    description : String,
    image : String,
    content : String

})

// build model
let Blogger = mongoose.model('blogs', blogSchema);

// send to use on router to show on database
module.exports = Blogger

// design function fot save data
module.exports.saveProduct = function(model, data){
    model.save(data)
}
