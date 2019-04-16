var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const products = require('./generated.json');


app.get('/list/', function (req, res) {

	res.send( JSON.stringify( products )  )

});


app.listen(3000, function () {

  console.log('Done');
});