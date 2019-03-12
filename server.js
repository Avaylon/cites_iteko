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

var	cities = [
	{id: 1, city: 'Москва', region: 'Россия' },
	{id: 2, city: 'Сочи', region: 'Россия' },
	{id: 3, city: 'Пекин', region: 'Китай' },
	{id: 4, city: 'Нью-Йорк', region: 'США' },
	{id: 5, city: 'Вашингтон', region: 'США' },
	{id: 6, city: 'Кливленд', region: 'США' },
	{id: 7, city: 'Питер', region: 'Россия' },
	{id: 8, city: 'Париж', region: 'Франция' },
	{id: 9, city: 'Амстердам', region: 'Амстердам'},
	{id: 10, city: 'Гонконг', region: 'Китай' },
]


var attrs = [
	{id: 1, name: 'Координаты', value: 3232},
	{id: 2, name: 'Население', value: 13932},
	// {id: 3, name: 'Описание', value: 'merve', type: 'text'},
 	{id: 4, name: 'Метро', value: false},
	{id: 5, name: 'Город-миллионник', value: false},
	{id: 6, name: 'Портовый', value: true },
];

app.post('/auth', function (req, res) {

	if (req.body.login === 'admin' && req.body.password === 'merve') {
		res.status(200).send( JSON.stringify({region: 'Россия', id: 30, token: 123, role: 'admin'}) )
	}
	else {
		res.status(401).send('User not found')
	}



});



app.put('/city/:uid', function (req, res) {


	var index = null

	for (var i = cities.length - 1; i >= 0; i--) {


		if (cities[i].id === req.body.id) {
			cities[i].city = req.body.city ? req.body.city : cities[i].city
			cities[i].region = req.body.region ? req.body.region : cities[i].region

			index = i
			break;

		}
		
	}




	res.send( JSON.stringify( cities[index] )  )
});


app.put('/attributes/:uid', function (req, res) {



	var index = null

	for (var i = attrs.length - 1; i >= 0; i--) {


		if (attrs[i].id === req.body.id) {


			attrs[i].name = req.body.name ? req.body.name: attrs[i].name
			attrs[i].value = req.body.value ? req.body.value : attrs[i].value

			index = i
			break;

		}

	}

	res.send( JSON.stringify( attrs[index] )  )
});


app.get('/attributes/', function (req, res) {


	var attrs = [
		{name: 'Описание', required: true},
		{name: 'Население', required: true},
		{name: 'Координаты', required: false},
		{name: 'Метро', required: false},
		{name: 'Портовый', required: false},

	]


	res.send( JSON.stringify( attrs )  )

})

app.delete('/attributes/:uid', function (req, res) {

	var id = false;



	for (var i = attrs.length - 1; i >= 0; i--) {

		if (attrs[i].id === req.body.id) {
			id = i;
			break;
		}

	}

	attrs.splice(id, 1)

	res.send( 'OK'  )
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

	res.send( 'OK' )
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

app.get('/city/attributes/:uid/', function (req, res) {



	//
	//
	// var attrs = {
	// 	id: 1,
	// 	population: 134934,
	// 	climate: 35,
	// 	coords: 3232,
	// 	economye: 99999,
	// 	view: '/img/city.jpg',
	// }



	res.send(  JSON.stringify(attrs) )
});


var id_city = 1000
var id_attr = 1000

app.post('/attributes', function (req, res) {



	id_attr++

	attrs.push( { id: id_attr, name: req.body.name, value: req.body.value  } )

	res.send( JSON.stringify({ id: id_attr, name: req.body.name, value: req.body.value  })  )
});

app.post('/city', function (req, res) {

	

	id_city++

	var obj = { id: id_city, city: req.body.name, region: req.body.region  }
	cities.push( obj )

	res.send( JSON.stringify( obj )  )
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