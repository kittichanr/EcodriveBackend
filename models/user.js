const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const HelloWorld = new Schema({ 
    username: { type: String, unique: true, index: true }, 
    password: String
})

const ModelClass = mongoose.model('user', HelloWorld)
module.exports = ModelClass