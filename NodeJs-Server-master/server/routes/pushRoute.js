const express = require('express');
const Router = express.Router();

Router.post("/sendPush", (request, res) => {
  var data = {
    app_id: "aee9826e-2e23-4762-8059-758f6f87a042",
    contents: {
      "en": request.body.message
    },
    included_segments: ["All"],
    small_icon: 'icon',
    large_icon: "http://www.beshutaf.org/wp-content/uploads/2015/02/01_logo.png"
  }
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic ODgwYzY3ODItZDU0NC00ZjgyLTg0YjMtNjM5ODNiMGZjNDRk"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
  res.send({
    success: "true"
  })
})

module.exports = Router;