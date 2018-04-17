const User = require('../models/user') ;

exports.login = (req, res, next) => { 
    User.findOne({ username: req.body.username, password: req.body.password },
        function(err,user) {
            if(err){
                console.log(err);
                res.send({'success':false,'message':'Could not connect to db'});
            }
            if(!user){
                res.send({'success':false,'message': 'User not found'});
                
            }else {
                res.send({'success':true,'user':user.username});
            }
        }

    )
};