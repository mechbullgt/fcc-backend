
var express = require('express');
var app = express();
// require('dotenv').config({
//     path:path.resolve(__dirname+"/.env")
// });
require('dotenv').config();

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */


/** 2) A first working Express Server */


/** 3) Serve an HTML file */
let path1 = __dirname +"/views/index.html";
app.get('/',(req,res)=>{
//   res.send("Hello");
res.sendFile(path1);
})

/** 4) Serve static assets  */
let absolutePath = __dirname + "/public";
app.use(express.static(absolutePath));


/** 5) serve JSON on a specific route */
// app.get('/json',(req,res)=>{
//     res.json({"message": "Hello json"});
//     });

/** 6) Use the .env file to configure the app */
let obj ={"message": "Hello json"};
app.get('/json',(req,res)=>{
res.json(doAsDirected(obj));
});

function doAsDirected(obj){
  let message;
  console.log('process.env.MESSAGE_STYLE :', process.env.MESSAGE_STYLE);
  if(process.env.MESSAGE_STYLE == "uppercase"){
  message = (obj['message']).toUpperCase();
  } else {
      console.log("No env variable found");
  }
  obj['message']=message;
  return obj;
}
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */


/** 9)  Get input from client - Route parameters */


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
app.listen(process.env.PORT || 5000 );

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
