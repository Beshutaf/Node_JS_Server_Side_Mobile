const path = require('path');
var cookieParser = require('cookie-parser');
//var request = require("request");
require('./config/config');
const suggestRoute=require('./routes/suggestRoute');
const usersRoute=require('./routes/usersRoute');
const pushRoute=require('./routes/pushRoute');
const facebookRoute = require('./routes/facebookRoute')
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var fs = require('fs');
var {mongoose} = require('./db/mongoose.js');
var {todo}= require('./models/todo');
const cors = require('cors');
var {authenticate} = require('./middleware/authenticate');
var {formidable} = require('formidable');
const _ = require('lodash');
var Cookies = require( "cookies" );
var app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(bodyParser.json());


app.use(cookieParser());
app.use(cors({origin:'*'}));

const port = process.env.PORT || 3000;

app.use('/suggest',suggestRoute);

app.use('/users',usersRoute);
app.use('/push',pushRoute);

app.use('/facebook',facebookRoute);
io.on('connection', (socket) => {
    socket.removeAllListeners()
  console.log('user connected');
    socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-product', (product) => {
   io.emit('product',product);
  });
  socket.on('like-product',(product)=>{
    io.emit('like',product);
});
  socket.on('dislike-product',(product)=>{
    io.emit('dislike',product);
});
socket.on('add-comment',(comment)=>{
    io.emit('comment',comment)
});
socket.on('set-status',(statusDetails)=>{
    
    io.emit('status',statusDetails);
})
});





http.listen(port, () => {
    console.log(`started at ${port}`);
});


module.exports = {app};