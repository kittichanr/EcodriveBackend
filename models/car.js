const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const ecodrive = new Schema({ 
    
    details : Schema.Types.ObjectId,
    fueltype : String,
    co2emission : Number,
    averagecons : Number

})

const ModelClass = mongoose.model('cars', ecodrive)
module.exports = ModelClass