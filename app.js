//loads all key value pairs from .env file into shell as environment variables
require('dotenv').config();

var express = require('express');
var cookieSession = require('cookie-session')
const app = express();
app.use(cookieSession({
  name: 'session',
  // use environment variables to store secure information
  keys: [process.env.KEY_ONE, process.env.KEY_TWO, process.env.KEY_THREE]
}));

app.get('/', function(req,res){

  // check if the session exists already
  // this is how you would check if the user is logged in
  // if(req.session.username)
  if(req.session.views){
    req.session.views = parseInt(req.session.views, 10) + 1;
  }else{
    req.session.views = 1;
  }


  res.end('<h1>I\'ve visited this page ' + req.session.views + 'times!</h1>');
});

app.get('/check-session', function(req, res){

  var response = 'user does not have a session';

  if(req.session.views){
    response = 'user has a session';
  }

  res.send('<h1>'  + response + '</h1>');
});

app.get('/reset', function(req, res){

  // delete the session
  req.session = null;

  res.end('<h1>Counter Reset</h1><a href="/">Start Counting Again!</a>');
});

app.listen(8080);
