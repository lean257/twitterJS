const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const tweetBank = require('../tweetBank');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req,res) {
  let tweets = tweetBank.list();
  res.render('index', {tweets: tweets, showForm: true} );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: list, showForm: true} );
});

router.get('/tweets/:id', function(req, res) {
  var id = req.params.id;
  var list = tweetBank.find( {id: parseInt(id)} );
  res.render( 'index', { tweets: list } );
  console.log(id, list)
});

router.post('/tweets', function(req, res) {
  console.log(req.body);
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

// router.get('/stylesheets/style.css', function(req, res){
//   res.sendFile('/stylesheets/style.css' , { root : __dirname+'/../public/'});
// })
module.exports= router;
