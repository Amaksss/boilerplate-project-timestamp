// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/:date?', (req, res) => {

  const date = req.params.date;
  let dateObject;

   //if there is an undefined or empty date parameter

   
   if (!date || typeof date === 'undefined' || date === "") {
      const now = new Date()
       return res.json({
           unix: now.getTime(),
           utc: now.toUTCString()
       })
   }

  //Checking if the input is a timestamp or datestring
  if (!isNaN(date)) { // if input is a timestamp
      dateObject = new Date(parseInt(date))
  }else

  //convert the date to date object by parsing the string
  dateObject = new Date(date);

  //use the date obect for conversion
  if (isNaN(dateObject.getTime())) { //checking if it is a valid date
      return res.json({ error: "Invalid Date"})
  } 
  
  res.json({ 
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString()
  }) 
  
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
