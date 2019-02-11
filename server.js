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




app.post('/registr', function (req, res) {
	res.send('Done!')
});
app.post('/auth', function (req, res) {

	if (req.body.login == 'name' && req.body.password == 'merve') {
		res.status(200).send( JSON.stringify({region: 'Россия'}) )
	}
	else {
		res.status(401).send('User not found')
	}

	

});
app.listen(3000, function () {

  console.log('Example app listening on port 3000!');
});