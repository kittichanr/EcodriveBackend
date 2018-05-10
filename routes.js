const user = require('./controllers/users');
const login = require('./controllers/login');
const obd2 = require('./controllers/obd2feed');
const car = require('./controllers/cardetails');
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://ecodrive:password@54.179.190.121:27017/ecodrive');


module.exports = function (app){
    app.get('/' , function(req,res,next){
        res.send({message: 'itServcie MongoDB'});
    });

    //--------------- USER ---------------------------
    app.get('/users', user.findAll)
    app.post('/users',user.create)
    app.get('/users/:id',user.findById)
    app.put('/users/:id',user.update)
    app.delete('/users/:id',user.delete)
    app.post('/login',login.login)
   
    //------------- OBD2_DATA ------------------------
    app.get('/obd2', obd2.findAll)
    app.get('/getValueEco/:id',obd2.findById)
    app.put('/updatedata/:id',obd2.update)

    //-------------- Car Detail ----------------------
    app.get('/cardetail',car.findcar)
    app.get('/cardata/:model',car.finddetailcar)

}