const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

var server = app.listen(3000);
var io = socketio.listen(server);

app.use('/', routes);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
  morgan(':id :method :url :response-time');
  next();
})

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates


// app.listen(3000, function(){
//   console.log('listening to port 3000');
// })
