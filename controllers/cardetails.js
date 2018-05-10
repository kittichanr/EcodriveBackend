const car = require('../models/car') ;
const model = require('../models/modelcar') ;


exports.findcar = (req, res, next) => {    
    car.aggregate([
        { $lookup:
           {
             from: 'carmodels',
             localField: 'details',
             foreignField: '_id',
             as: 'details'    
           }
           },{$project : {_id: 0 ,details :{_id:0}}}
        ]).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."

        });
    }) ;
} ;


exports.finddetailcar = (req, res, next) => { 
    car.aggregate([
        { $lookup:
           {
             from: 'carmodels',
             localField: 'details',
             foreignField: '_id',
             as: 'details'    
           }
           },
     { $match : {'details.model':req.params.model}}
   ]).then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."

    });
}) ;
    
};