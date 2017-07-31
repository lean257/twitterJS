const express = require('express');
const app = express();

app.use(function (req, res, next) {
  console.log(req.method, res.statusCode);
  next();
})

app.get('/', function(req,res,next){
  res.send('Welcome!');
})
app.get('/news', function(req,res,next){
  res.send('Welcome to the news page!');
})
app.get('/special/', function(req,res,next){
  res.send('you reached the special area!');
})
app.listen(3000, function(){
  console.log('listening to port 3000');
})
