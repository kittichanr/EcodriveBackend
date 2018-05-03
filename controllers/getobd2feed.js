const Obd2 = require('../models/obd2feed') ;

exports.findAll = (req, res, next) => {    
    Obd2.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."

        });
    }) ;
} ;

exports.findById = (req, res, next) => {    
    Obd2.findById(req.params.id, { acceleration: 1,fuelrate:1,co2:1 },function (err, results){
        if (err) { return next(err) }         
        res.json(results) 
    })
} 