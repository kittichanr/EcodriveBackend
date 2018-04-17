const User = require('../models/user') ;

exports.findAll = (req, res, next) => {    
    var query = req.query.term 
    User.find({        
        $or: [{ name: new RegExp(query) },        
            { username: new RegExp(query) }]    
        }, 
        (err, results) => {
        if (err) { return next(err) } 
        res.json(results)
    }) 
} 

exports.findById = (req, res, next) => {    //ใช้ findById ค้นหำข้อมูลฟิลด์ _id ตำม id ที่ส่งมำได้เลยครับ    //ฟิลด์ _id ตัว mongodb สร้ำงให้อัตโนมัติตอนบันทึกเรำน�ำมำใช้ได้เลยครับ    //โดยค่ำของ id เรำจะมั่วๆ ใส่ 1, 2, 3 แบนี้ไม่ได้นะครับเพรำะมันเป็น id ที่ hash มำแบบมีรูปแบบ    //ถ้ำไม่พบข้อมูลระบบจะ return ค่ำ null ออกมำครับ    
    User.findById(req.params.id, function (err, results) {        
        if (err) { return next(err) }   //ดักจับ error        
        res.json(results)   //ส่ง response กลับไปเป็น javascript object ของ user    
    }) 
}

exports.create = (req, res, next) => {    //ก่อนอื่นค้นหำก่อนว่่ำ username ที่ส่งมำมีข้อมูลอยู่หรือไม่    
    User.findOne({ username: req.body.username }, 
        (err, result) => {        
            if (err) { return next(err); }        
            if (result) {            //ถ้ำมี username นี้อยู่แล้วในระบบก็ให้แจ้งกลับไปจะไม่บันทึก           
                 res.json({ status: 201, message: 'Username is Duplicate' })        
                } 
                 else {            //สร้ำง Object user จำก model user แล้วรับค่ำที่ request เข้ำมำ             //โดยจะบันทึกตำมชื่อของค่ำที่ request ที่ต้องตรงกับ Schema ของ User            
                    const user = new User(req.body)            
                    user.save(err => {                //ถ้ำมี error ก็โยน error ไปให้ middleware ถัดไป                
                        if (err) { return next(err) }                //บันทึกส�ำเร็จก็ส่ง javascript object ของ user กลับไป                
                        res.json(user)            
                    })        
                }    
        } )
}

exports.update = (req, res, next) => {    
    var id = req.params.id  //id ที่ส่งมำเพื่อเอำมำค้นหำในกำรอัพเดท    //ในกำรจะปรับปรุงข้อมูลเรำต้องเช็คก่อนว่ำ username ที่สงมำเป็น id เดียวกับที่ส่งมำหรือไม่    //ถ้ำ id ที่ findOne หำจำก username ไม่ตรงกับ id ที่ส่งมำแสดงว่ำ username ไปซ�้ำกับรำยกำรอื่น    
    User.findOne({ username: req.body.username }, 
        (err, results) => {
        if (err) { return next(err) }   //ดักจับ error        
        var isUpdate = false;       
        if (results) {            //ค่ำ req.params.id ส่งมำเป็น string ดังนั้นกำรเปรียบเทียบค่ำของ results._id            //จึงต้องแปลงเป็น string ก่อน            
            if (results._id.toString() !== id) {                
                res.send({ status: 201, message: 'Username is Duplicate' })            
            } else {                
                isUpdate = true            
            }        
        } else {            
            isUpdate = true        
        }        
        if (isUpdate) {            //option {new: true} จะคือค่ำ user ที่ได้อัพเดทแล้ว ถ้ำไม่ก�ำหนดจะคืนค่ำ user ก่อนอัพเดท            
        User.findOneAndUpdate({ _id: id }, 
            req.body, { 
                new: true },
                 (err, user) => {                
                     if (err) {                    
                         return next(err)                
                        } else {                    //บันทึกส�ำเร็จก็ส่ง javascript object ของ user กลับไป                   
                             res.json(user)                
                            }            
                        })        
                    }    
                }) 
            }
            
            exports.delete = (req, res, next) => {    
                User.findByIdAndRemove(req.params.id, 
                    (err, result) => {       
                         if (err) {            
                             return next(err)        
                            } else {            //ลบส�ำเร็จก็ส่ง javascript object ของ user ที่ถูกลบกลับไป           
                                 res.json(result)        
                                }    
                            }) 
                        }            