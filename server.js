const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

mongoose.connect('mongodb://HelloWorld:password@54.179.190.121:27017/HelloWorld');

const PORT = 3000;
const routes = require('./routes')
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({type: '*/*'}))
routes(app)


app.listen(PORT, () => {
    console.log('ready server on http://localhost:' + PORT)
})