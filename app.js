const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');

app.use(function (req, res, next) {
  morgan(':id :method :url :response-time');
  next();
})

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates
app.get('/', function(req,res,next){
  const names = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render( 'index', {title: 'Hall of Fame', people: names} );
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
