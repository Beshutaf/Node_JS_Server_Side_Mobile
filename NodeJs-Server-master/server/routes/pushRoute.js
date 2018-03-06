const express = require('express');
const Router = express.Router();

Router.post("/sendPush", (request, res) => {
  var data = {
    app_id: "c3a913ba-a482-4e9b-ad85-e73f2c4e3397",
    contents: {
      "en": request.body.message
    },
    included_segments: ["All"],
    small_icon: 'icon',
    large_icon: "http://www.beshutaf.org/wp-content/uploads/2015/02/01_logo.png"
  }
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic N2FmMzIyZmMtMjI3Ni00MDI3LTg4YmQtMDI0YzhiNDY4ZmFm"
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