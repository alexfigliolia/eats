//server.js
'use strict'
//first we import our dependencies…
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const yelp = require('yelp-fusion');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3001;
const staticFiles = express.static(path.join(__dirname, 'client/build'));
const clientId = '6oY5jnl_5kh_jIegdVErKQ';
const clientSecret = 'PdpLUWvvy-MwnVNbmxB1YrAy4L79eGj5JVLk1AkdAy_YifPE5OmZK0kAHRjuniTbGMB9c94tl3MWIvyVt5pkUUC4yV2CBh7GlShQwGxPvugKaGhBLPj2KoJmWkwCWXYx';

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

app.use(staticFiles)

// router.get('*', function(req, res) {
//  res.json({ message: 'API Initialized!'});
// });
const client = yelp.client('PdpLUWvvy-MwnVNbmxB1YrAy4L79eGj5JVLk1AkdAy_YifPE5OmZK0kAHRjuniTbGMB9c94tl3MWIvyVt5pkUUC4yV2CBh7GlShQwGxPvugKaGhBLPj2KoJmWkwCWXYx');

let searchData = [];

app.post('/data', function(req, res){    
  const city = req.body.city;
  const cuisine = req.body.cuisine;
  const matchRating = req.body.matchRating;
  const	budget = req.body.budget;
  const offset = req.body.offset;
  console.log(req.body);
  const searchRequest = {
	  term:cuisine,
	  location: city,
	  sort_by: matchRating,
	  price: budget,
	  offset: offset
	};

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(firstResult, null, 4);
    // console.log(prettyJson);
    searchData.push(firstResult);
    res.send(searchData);
    console.log(searchData);
  })
	.catch(e => {
	  console.log(e);
	});
});

app.post('/place', function(req, res){
	const place = req.body.place;
	console.log(place);
	client.business(place).then(response => {
	  console.log(response.jsonBody);
	  res.send(response.jsonBody);
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