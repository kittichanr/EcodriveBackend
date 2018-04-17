const user = require('./controllers/users');
const login = require('./controllers/login');
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://HelloWorld:password@54.179.190.121:27017/HelloWorld');


module.exports = function (app){
    app.post('/' , function(req,res,next){
        res.send({message: 'itServcie MongoDB'});
    });
    app.get('/users', user.findAll)
    app.post('/users',user.create)
    app.get('/users/:id',user.findById)
    app.put('/users/:id',user.update)
    app.delete('/users/:id',user.delete)
    app.post('/login',login.login)
}