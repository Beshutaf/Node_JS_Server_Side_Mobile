const express = require('express');
const Facebook = require('../models/facebook');
const Router = express.Router();
const mongoose = require('mongoose');

Router.get('/getAll', (req, res) => {
  Facebook.find({}).then((facebook) => {
    res.send(facebook);
  })
});

Router.post('/addFacebook', (req, res) => {
  Facebook.remove({}).then(() => {
    for (face of req.body) {
      const facebook = new Facebook(face);
      facebook.save();
    }
    return true;
  }).then(() => {
    res.send(req.body);
  }).catch((err) => {
    res.send({
      success: false
    });
  })
})

module.exports = Router;