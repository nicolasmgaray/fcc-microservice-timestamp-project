// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  try{  
     let date = req.params.date_string ? new Date(req.params.date_string) : new Date()   
     // If invalid, could still be UNIX time
     if(date=='Invalid Date') date=new Date(parseInt(req.params.date_string))  
     // If still invalid, return error
     if(date=='Invalid Date') return res.json({"error" : "Invalid Date"})   
     // Success
     return res.json({"unix": date.getTime(), "utc" : date.toUTCString() })
    
  }
  catch(error){
    return res.json({"error" : error})   
  }
 
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});