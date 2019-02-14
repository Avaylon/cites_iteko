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


app.post('/auth', function (req, res) {

	console.log(req.body)
	console.log(req)

	if (req.body.login == 'name' && req.body.password == 'merve') {
		res.status(200).send( JSON.stringify({region: 'Россия', id: 30, token: 123}) )
	}
	else {
		res.status(401).send('User not found')
	}

	

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
		{id: 1, city: 'Москва', coords: 3467, region: 'Россия', description: '--' },
		{id: 2, city: 'Сочи', coords: 3443, region: 'Россия', description: '--' },
		{id: 3, city: 'Пекин', coords: 1212, region: 'Китай', description: '--' },
		{id: 4, city: 'Питер', coords: 4396, region: 'Россия', description: '--' },
		{id: 5, city: 'Париж', coords: 4964, region: 'Франция', description: '--' },
	]

	res.send( JSON.stringify(cities)  )
});
app.post('/registr', function (req, res) {
	res.status(201).send( JSON.stringify({id: 40, token: 123}) )
});

app.post('/auth_token', function (req, res) {
	res.status(200).send( JSON.stringify({
		id: 30,
		name: 'name',
		region: 'Россия'
	}))

});

app.listen(3000, function () {

  console.log('Example app listening on port 3000!');
});