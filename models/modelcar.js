const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const ecodrive = new Schema({ 
    _id : Schema.Types.ObjectId,
    make : String,
    model : String,
    year : Date,
    engine : String,
    gearbox : String,
    weightcar : Number

})

const ModelClass = mongoose.model('carmodels', ecodrive)
module.exports = ModelClass