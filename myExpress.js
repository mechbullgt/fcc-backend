
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// require('dotenv').config({
//     path:path.resolve(__dirname+"/.env")
// });
require('dotenv').config();

// --> 7)  Mount the Logger middleware here
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
// app.use((req,res,next)=>{
//   res.on('finish',()=>{
//     console.log(req.method+" "+req.path+" "+req.ip);
//   })
//   next();
// })

function rootLevelLogger(req,res, next){
  res.on('finish',()=>{
    console.log(req.method+" "+req.path+" - "+req.ip);
  });
  next();
};

app.use(rootLevelLogger);

// --> 11)  Mount the body-parser middleware  here
function bodyParserMiddleware(){
  return bodyParser.urlencoded({extended:false});
}

// parse application/x-www-form-urlencoded
app.use('/',bodyParserMiddleware());

/** 1) Meet the node console. */


/** 2) A first working Express Server */


/** 3) Serve an HTML file */
let path1 = __dirname +"/views/index.html";
app.get('/',(req,res)=>{
//   res.send("Hello");
res.sendFile(path1);
})

/** 4) Serve static assets  */
// let absolutePath = __dirname + "/public";
// app.use(express.static(absolutePath));


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

/** 8) Chaining middleware. A Time server */
app.get('/now',function middleware(req,res,next){
  req.time = new Date().toString();
  // Don't forget to add next() in each handler to keep rolling
  next();
}, function finalHandler(req, res, next){
  res.send({time: req.time});
  next();
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo',(req,res,next)=>{
  console.log(req.params);
  res.send({echo:req.params.word});
  next();
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
// app.get('/name',(req,res)=>{
//   console.log('req.query :', req.query);
//   res.json(responseHandler(req.query));
// })

// function responseHandler(params){
//   let reqKeys = Object.keys(params);
//   let obj={};
//   let fullname = params[reqKeys[0]]+" "+params[reqKeys[1]];
//   console.log('fullname :', fullname);
//   obj.name = fullname;
//   console.log('obj :', obj);
//   return obj;
// }

// app.route('/name').get((req,res)=>{responseHandler(req,res)});

// function responseHandler(req,res){
//   let params = req.query;
//   let reqKeys = Object.keys(params);
//   let first = reqKeys[0];
//   let last = reqKeys[1];
//   let obj={};
//   let fullname = params.first+" "+params.last;
//   console.log('fullname :', fullname);
//   obj['name'] = fullname;
//   console.log('obj :', obj);
//   res.json(obj);
// }
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.post('/name',(req,res)=>{
  console.log(req.body);
  let obj ={};
  obj['name']= req.body.first+" "+req.body.last;
  res.send(obj);
})

/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
app.listen(process.env.PORT || 5000 );

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
