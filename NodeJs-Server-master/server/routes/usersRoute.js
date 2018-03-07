const express = require('express');
const _ = require('lodash');
var fs = require('fs');
var cookieParser = require('cookie-parser');

var {
  user
} = require('../models/user');
var {
  authenticate
} = require('../middleware/authenticate');

const mongoose = require('mongoose');
const Router = express.Router();
const bcrypt = require('bcryptjs');
var http = require('http');
const jwt = require('jsonwebtoken');

Router.post('/', (req, res) => {

  console.log("in server register");
  var tmpUser = new user();
  //processAllFieldsOfTheForm(req, res);
  var User = new user({

    //  uname : req.body.uname,
    email: req.body.email,
    fName: req.body.fName,
    lName: req.body.lName,
    PhoneNo: req.body.PhoneNo,
    Gender: req.body.Gender,
    authen: req.body.authen,
    password: req.body.password

  });

  var temp = req.body.email;

  user.collection.findOne({
    email: temp
  }, function(err, tmpUser) {
    if (err) {
      console.log("in IF unable to fetch user");
    } else if (!tmpUser) {
      console.log("DOES NOT EXIST");

      User.save().then(() => {
        return User.generateAuthToken();
      }).then((token) => {
        res.header('x-auth', token).send(User);

      }).catch((e) => {
        res.status(400).send(e);
      })
      console.log(req.query);
    } else {
      console.log(tmpUser.email);
      //   User.invalidate("uname", "username must be unique");
      //  done(new Error("username must be unique"));
    }


    // return Promise.reject();
  });
  /*user.find({'uname':req.body.uname},function(err,user){

      
          if (err) {

              console.log('Signup error');
              return done(err);
          }

          //if user found.
          if (user.length!=0) {
            if(user[0].uname){
              console.log('Username already exists, username: ' + uname);                         
               }                             
               var err = new Error();
              err.status = 310;
              return done(err);

          }
  });*/
  /* db.collection('users').find({text:"Ala"}).toArray().then((docs)=>{
   console.log("users");
     console.log( JSON.stringify(docs,undefined,2));//{
 //     console.log("FOUND");
 // }
  //console.log(JSON.stringify(docs,undefined,2).name==);
    },(err)=>{
    });*/

  // var body = _.pick(req.body,'uname');

  // user.findByCredentials(body.uname).then((User)=>{

  //res.send(User);

});

/*Router.post('/cookie', (req,res)=>{
 

 // res.send(req.cookies);
});
*/



Router.get('/', (req, res) => {

  console.log("test11112");
  user.find().then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send({
      user
    });
  }).catch((e) => {

    res.status(404).send();
  })
});

Router.get('/users/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {

    return res.status(404).send();
  }
  user.findById(id).then((user) => {
    if (!user) {
      console.log("wrong username");
    } else {
      res.send(user);
      console.log("user by id ", user);
    }
  }).catch((e) => console.log(e));
});

Router.delete('/users/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  user.findByIdAndRemove(id).then((User) => {

    if (!user)
      return res.status(401).send();
    res.send(User);
  }).catch((e) => {
    res.status(402).send();
  });

});

Router.post('/autologin', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  user.findByCredentials(body.email, body.password).then((User) => {
    // console.log ("length: "+User.tokens.length);

    // if(User.tokens[0].token === req.cookies.tokenCookie){
    res.header().send(User);

    // }
    // else{
    //res.status(400).send(); 
    //  return false;
    // }  
  },
  (error) => {
    res.status(401).send();
  });
});

Router.post('/cookie', (req, res) => {
  console.log("in log in");
  var body = _.pick(req.body, ['email', 'password']);
  res.cookie('user', "whatMan").send();
  // res.cookie('logintest',[req.body.uname ,req.body.password ], { httpOnly: false}).send(req.cookies.remember);//, {maxAge:}
});

Router.get('/cookie', function(req, res) {
  res.send(req.cookies.user);
});

Router.post('/login', (req, res) => {
  console.log("in log in");
  var body = _.pick(req.body, ['email', 'password']);


  //server = http.createServer( function( req, res ) {


  //});*/


  //res.header("Set-Cookie", set_cookies);
  // console.log(req.body.uname+""+""+req.body.password);


  user.findByCredentials(body.email, body.password).then((User) => {

    /*  if(User.tokens.length>0)
       User.removeToken(req.cookies.tokenCookie).then(()=>{
  
    }, ()=>{
        res.status(400).send();
   })*/
    return User.generateAuthToken().then((token) => {
      //  res.cookie('tokenCookie',token, {path:'/', secure:false, httpOnly: false });//, {maxAge:}
      // res.cookie('authCookie',User.authen,{ path:'/',secure:false,httpOnly:false});
      // res.header('x-auth',token).send(User);

      res.header('Access-Control-Allow-Credentials', true).send(User);

    });
  }).catch((e) => {
    res.status(401).send();
  });
  //console.log("authen type:  "+ res);
  //  console.log('Cookies: ', req.cookies);

});

Router.get('/me', authenticate, (req, res) => {
  res.send(req.User);
});

Router.delete('/me/token', authenticate, (req, res) => {
  req.User.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
});

Router.post('/update', (req, res) => {
  var tempu = new user({
    _id: req.body.id,
    // uname : req.body.uname,
    email: req.body.email,
    fName: req.body.fName,
    lName: req.body.lName,
    PhoneNo: req.body.PhoneNo,
    Gender: req.body.Gender,
    authen: req.body.authen
  });


  const id = mongoose.Types.ObjectId(req.body.id);
  user.findByIdAndUpdate(id, tempu, {
    new: true
  }, function(err, tempu) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.send(tempu);
    }
  });
});

Router.post('/delete', (req, res) => {
  const id = mongoose.Types.ObjectId(req.body.id);
  user.findByIdAndRemove(id).then((user) => {

    res.send({
      success: "true"
    });
  }).catch((e) => {
    res.send({
      success: "failed"
    })
  });
});

Router.post('/rstPas', (req, res) => {
  var tempu = new user({
    _id: req.body.id,
    // uname : req.body.uname,
    email: req.body.email,
    fName: req.body.fName,
    lName: req.body.lName,
    password: req.body.password,
    PhoneNo: req.body.PhoneNo,
    Gender: req.body.Gender,
    authen: req.body.authen
  });
  tempu.password = req.body.password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(tempu.password, salt, (err, hash) => {
      tempu.password = hash;
      const id = mongoose.Types.ObjectId(req.body.id);
      user.findByIdAndUpdate(id, tempu, {
        new: true
      }, function(err, tempu) {
        if (err) {
          res.json({
            error: err
          });
        } else {
          res.send(tempu);
        }
      });
    });
  })
});

module.exports = Router;