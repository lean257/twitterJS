const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const tweetBank = require('../tweetBank');

router.use(bodyParser.urlencoded({extended: false}));

module.exports = function(io) {

  router.get('/', function(req,res) {
    let tweets = tweetBank.list();
    res.render('index', {tweets: tweets, showForm: true, HomePage: true} );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list, showForm: true, showName: true, name: name} );
  });

  router.get('/tweets/:id', function(req, res) {
    var id = req.params.id;
    var list = tweetBank.find( {id: parseInt(id)} );
    res.render( 'index', { tweets: list } );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet', { name: name, text: text });
    res.redirect('/');
  });
  return router;
}

// router.get('/stylesheets/style.css', function(req, res){
//   res.sendFile('/stylesheets/style.css' , { root : __dirname+'/../public/'});
// })
