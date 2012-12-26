var request = require('request');
var url = require('url');

var express = require('express');
var app = express();

app.configure(function(){ 
  //app.use(express.logger());  
  //app.use(express.methodOverride()); 
  //app.use(express.bodyDecoder()); 
  //app.use(app.router); 
  //app.use(express.staticProvider(__dirname + '/www/public')); 
  app.set('views', __dirname + '/views');  
  app.set('view engine', 'ejs'); 
}); 

app.get('/', function(request, response) {
  response.sendfile(__dirname + "/index.html");
});

var request = require('request');
var url = require('url');

app.get('/tweets/:username', function(req, response) {
  var username = req.params.username;
  options = {
    protocol: "http:",
  host: 'api.twitter.com',
  pathname: '/1/statuses/user_timeline.json',
  query: { screen_name: username, count: 10}
  }
  var twitterUrl = url.format(options);

  request(twitterUrl, function(err, res, body) {
    var tweets = JSON.parse(body);
    response.render('tweets.ejs', {tweets: tweets, name: username});
  });

  //request(twitterUrl).pipe(response);
});


app.listen(8080)
