//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var yelp = require('yelp-fusion');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent dogs
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

var staticFiles = express.static(path.join(__dirname, '/build'));
app.use(staticFiles)

// router.get('*', function(req, res) {
//  res.json({ message: 'API Initialized!'});
// });

var clientId = '6oY5jnl_5kh_jIegdVErKQ';
var clientSecret = 'YC1hQQ901vBStXUMh8kYGdCJh4IFKX4EBBX82vodDmz3ZQYNkVZ87A8EhqIkq3kY';

var searchData = [];

app.post('/data', function(req, res){    
    var city = req.body.city;
    var cuisine = req.body.cuisine;
    var matchRating = req.body.matchRating;
    var budget = req.body.budget;
    var offset = req.body.offset;
    console.log(req.body);
    var searchRequest = {
	  term:cuisine,
	  location: city,
	  sort_by: matchRating,
	  price: budget,
	  offset: offset
	};
    yelp.accessToken(clientId, clientSecret).then(response => {
	  const client = yelp.client(response.jsonBody.access_token);

	  client.search(searchRequest).then(response => {
	    const firstResult = response.jsonBody.businesses;
	    const prettyJson = JSON.stringify(firstResult, null, 4);
	    // console.log(prettyJson);
	    searchData.push(firstResult);
	    res.send(searchData);
	    console.log(searchData);
	  });
	}).catch(e => {
	  console.log(e);
	});
})

app.post('/place', function(req, res){
	var place = req.body.place;
	console.log(place);
	// });
	yelp.accessToken(clientId, clientSecret).then(response => {
	  	const client = yelp.client(response.jsonBody.access_token);
		client.business(place).then(response => {
		  console.log(response.jsonBody);
		  res.send(response.jsonBody);
		}).catch(e => {
		  console.log(e);
		});
	}).catch(e => {
	  console.log(e);
	});
})
//Use our router configuration when we call /api
// app.use('/api', router);

// any routes not picked up by the server api will be handled by the react router
app.use('*', staticFiles);

//starts the server and listens for requests
// app.listen(port, function() {
//  console.log('api running on port ' + port );
// });
app.set('port', (process.env.PORT || 3001));


app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})