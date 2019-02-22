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

	if (req.body.login == 'admin' && req.body.password == 'merve') {
		res.status(200).send( JSON.stringify({region: 'Россия', id: 30, token: 123, role: 'admin'}) )
	}
	else {
		res.status(401).send('User not found')
	}

	

});

var	cities = [
	{id: 1, city: 'Москва', region: 'Россия' },
	{id: 2, city: 'Сочи', region: 'Россия' },
	{id: 3, city: 'Пекин', region: 'Китай' },
	{id: 4, city: 'Нью-Йорк', region: 'США' },
	{id: 5, city: 'Вашингтон', region: 'США' },
	{id: 6, city: 'Кливленд', region: 'США' },
	{id: 7, city: 'Питер', region: 'Россия' },
	{id: 8, city: 'Париж', region: 'Франция' },
]



app.put('/city/:uid', function (req, res) {



	for (var i = cities.length - 1; i >= 0; i--) {


		if (cities[i].id === req.body.id) {


			cities[i].city = req.body.city ? req.body.city : cities[i].city
			cities[i].region = req.body.region ? req.body.region : cities[i].region
			break;

		}
		
	}




	res.send( JSON.stringify( cities )  )
});

app.delete('/city/:uid', function (req, res) {

	var id = false;



	for (var i = cities.length - 1; i >= 0; i--) {

		if (cities[i].id === req.body.id) {
			id = i;
			break;
		}

	}

	cities.splice(id, 1)

	res.send( JSON.stringify( cities)  )
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
			title: 'Питер',
			description: 'Культурная столица'
		},
		{
			title: 'Питер',
			description: 'Культурная столица'
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

app.get('/city/:uid/attribute', function (req, res) {

	var attrs = {
		id: 1,
		population: 134934,
		climate: 35,
		coords: 3232,
		economye: 99999,
		view: '/img/city.jpg',
		optional: {
			comments: 'merve',
			date: 1993
		}
	} 


	res.send(  JSON.stringify(attrs) )
});


var id_city = 1000

app.post('/city', function (req, res) {

	

	id_city++


	cities.push( { id: id_city, city: req.body.name, region: req.body.region  } )

	res.send( JSON.stringify(cities)  )
});

app.get('/regions', function (req, res) {


	res.send( JSON.stringify( ['Россия', 'Китай', 'Франция', 'США'] ))
});

app.get('/city', function (req, res) {


	res.send( JSON.stringify(cities)  )
});
app.post('/registr', function (req, res) {
	res.status(201).send( JSON.stringify({id: 40, token: 123, role: 'guest'}) )
});

app.post('/auth_token', function (req, res) {
	res.status(200).send( JSON.stringify({
		id: 30,
		name: 'admin',
		role: 'admin',
		region: 'Россия',
	}))

});

app.listen(3000, function () {

  console.log('Done');
});