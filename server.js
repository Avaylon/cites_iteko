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

app.get('/city/:uid', function (req, res) {


	var id = req.url.substr(-1)

	var arr = [ 
		{
			title: 'Москва',
			description: 'Столица'
		},
		{
			title: 'Сочи',
			description: 'Солнечный город'
		},
		{
			title: 'Пекин',
			description: 'Столица Китая'
		},
		{
			title: 'Питер',
			description: 'Культурная столица'
		},
		{
			title: 'Париж',
			description: 'Столица франции'
		}
	]


	res.send(
		arr[--id]
	)
});

app.get('/city', function (req, res) {

	var	cities = [
		[1, 'Москва','3467','Россия','--'],
		[2, 'Сочи','3443','Россия','--'],
		[3, 'Пекин','1212','Китай','--'],
		[4, 'Питер','4396','Россия','--'],
		[5, 'Париж','4964','Франция','--'],
	]

	res.send( JSON.stringify(cities)  )
});
app.post('/registr', function (req, res) {
	res.status(201).send( JSON.stringify({id: 40}) )
});
app.post('/auth', function (req, res) {

	if (req.body.login == 'name' && req.body.password == 'merve') {
		res.status(200).send( JSON.stringify({region: 'Россия', id: 30}) )
	}
	else {
		res.status(401).send('User not found')
	}

	

});
app.listen(3000, function () {

  console.log('Example app listening on port 3000!');
});