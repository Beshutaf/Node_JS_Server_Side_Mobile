const express = require('express');
const mongoose = require('mongoose');
const Products = require('../models/suggestAProduct');
const pendingProduct = require('../models/pendinglist');
const Router = express.Router();

Router.get('/getcomments', (req, res) => {

  const id = mongoose.Types.ObjectId(req.query.id);
  Products.findById(id).then((product) => {
    res.send(product.comments)
  })
})

Router.post('/addcomment', (req, res) => {

  const id = mongoose.Types.ObjectId(req.body.id);
  console.log("hi");
  Products.findByIdAndUpdate(id, {
    $push: {
      comments: {
        username: req.body.user,
        comment: req.body.comment
      }
    }
  }).then((product) => {
    res.send({
      Success: true
    });
  }).catch((err) => {
    console.log("sorry product not found")
  });
})

Router.post('/addproduct', (req, res) => {

  console.log(req.body);
  const newProduct = new Products(req.body);
  newProduct.save().then((product) => {
    res.send({
      success: true,
      id: product.id
    });
    console.log('sent');
  }).catch((err) => {
    res.send({
      success: false
    })
    console.log(err);
  })
});

Router.post('/approve', (req, res) => {
  const id = mongoose.Types.ObjectId(req.body.id);
  Products.findByIdAndUpdate(id, {
    Accepted: true,
    AmountOfLikes: req.body.amountoflikes
  }).then((product) => {
    res.send({
      success: true
    });
  }).catch(() => {
    res.send({
      success: false
    });
  })
});

Router.post('/deleteProduct', (req, res) => {
  const id = mongoose.Types.ObjectId(req.body.id);
  Products.remove({
    _id: id
  }).then(() => {
    res.send({
      sucess: "true"
    });
  })
});

Router.post("/dislikeProduct", (req, res) => {

  const id = mongoose.Types.ObjectId(req.body._id);
  const user = req.body.user;

  Products.findById(id).then((product) => {
    product.update({
      $inc: {
        Likes: -1
      },
      $pull: {
        likedUsers: user
      }
    }).then((product) => {


      res.send({
        success: true
      });
    })
  }).catch((err) => {
    res.send({
      success: false
    });
  })
});

Router.post("/likeProduct", (req, res) => {

  const id = mongoose.Types.ObjectId(req.body._id);
  const user = req.body.user;

  Products.findById(id).then((product) => {
    product.update({
      $inc: {
        Likes: 1
      },
      $push: {
        likedUsers: user
      }
    }).then((product) => {
      res.send({
        success: true
      });
    })
  }).catch((err) => {
    res.send({
      success: false
    });
  })
});

Router.post('/setstatus', (req, res) => {
  const id = mongoose.Types.ObjectId(req.body.id);
  Products.findByIdAndUpdate(id, {
    status: req.body.status
  }).then(() => {
    res.send({
      success: true
    });
  }).catch(() => {
    res.send({
      success: false
    });
  })
})

Router.get('/getAllProducts', (req, res) => {
  Products.find({}, (err) => {

  }).sort('_id').then((products) => {
    res.send(products);
  }).catch((err) => {
    res.send({
      success: false
    });
  })
});

module.exports = Router;