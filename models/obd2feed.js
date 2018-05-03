const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const ecodrive = new Schema({ 
    speed : Number , 
    co2 : Number,
    time : Date,
    distance : Number,
    fuelrate : Number,
    accelation : Number,
    trip : Schema.Types.ObjectId

})

const ModelClass = mongoose.model('obd2feed', ecodrive)
module.exports = ModelClass