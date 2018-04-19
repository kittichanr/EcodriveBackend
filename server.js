const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

mongoose.connect('mongodb://HelloWorld:password@54.179.190.121:27017/HelloWorld');

var port = process.env.PORT || 3000;
const routes = require('./routes')
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({type: '*/*'}))
routes(app)

app.set('port', port);

var server = http.createServer(app);

server.listen(port);