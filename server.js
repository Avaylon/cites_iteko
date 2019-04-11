const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pgp = require("pg-promise")(/*options*/);
const db_query = require('./database.js');

const db = pgp({host: '82.146.58.11', user: 'postgres', port: '5432', database: 'new_db', password: '123'});

const cites = [];
const attrs = [];
const attrsAll = [];
const regions = [];


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

db.many(db_query.selectCites, null)
    .then(function (data) {
        cites.push(...data)
    })
    .catch(function (error) {
        console.log("ERROR CITES:", error);
    });


db.many(db_query.selectAttrs, null)
    .then(function (data) {
        attrsAll.push(...data)
    })
    .catch(function (error) {
        console.log("ERROR ATTRS:", error);
    });

db.many(db_query.selectRegions, null)
    .then(function (data) {
        regions.push(...data)
    })
    .catch(function (error) {
        console.log("ERROR REGIONS:", error);
    });

app.post('/auth', function (req, res) {

    if (req.body.login === 'admin' && req.body.password === 'merve') {
        res.status(200).send(JSON.stringify({region: 'Россия', id: 30, token: 123, role: 'admin'}))
    } else {
        res.status(401).send('User not found')
    }


});


app.put('/city/:uid', function (req, res) {


    var index = null

    for (var i = cites.length - 1; i >= 0; i--) {


        if (cites[i].id === req.body.id) {
            cites[i].city = req.body.city ? req.body.city : cites[i].city
            cites[i].region = req.body.region ? req.body.region : cites[i].region

            index = i
            break;

        }

    }


    res.send(JSON.stringify(cites[index]))
});


app.put('/attributes/:uid', function (req, res) {


    var index = null

    for (var i = attrs.length - 1; i >= 0; i--) {


        if (attrs[i].id === req.body.id) {


            attrs[i].name = req.body.name ? req.body.name : attrs[i].name
            attrs[i].value = req.body.value ? req.body.value : attrs[i].value

            index = i
            break;

        }

    }

    res.send(JSON.stringify(attrs[index]))
});


app.get('/attributes/', function (req, res) {


    res.send(JSON.stringify(attrsAll))

});

app.delete('/attributes/:uid', function (req, res) {

    var id = false;


    for (var i = attrs.length - 1; i >= 0; i--) {

        if (attrs[i].id === req.body.id) {
            id = i;
            break;
        }

    }

    attrs.splice(id, 1)

    res.send('OK')
});

app.delete('/city/:uid', function (req, res) {

    var id = false;


    for (var i = cites.length - 1; i >= 0; i--) {

        if (cites[i].id === req.body.id) {
            id = i;
            break;
        }

    }

    cites.splice(id, 1)

    res.send('OK')
});


app.get('/city/attributes/:uid/', function (req, res) {


    db.many(db_query.selectOptions(req.params.uid), null)
        .then(function (data) {
            attrsAll.push(...data)

            res.send(JSON.stringify(attrsAll))
        })
        .catch(function (error) {
            console.log("ERROR OPTIONS:", error);
        });




});


var id_city = 1000
var id_attr = 1000

app.post('/attributes', function (req, res) {


    id_attr++

    attrs.push({id: id_attr, name: req.body.name, value: req.body.value})

    res.send(JSON.stringify({id: id_attr, name: req.body.name, value: req.body.value}))
});

app.post('/city', function (req, res) {


    id_city++

    var obj = {id: id_city, city: req.body.name, region: req.body.region}
    cites.push(obj)

    res.send(JSON.stringify(obj))
});

app.get('/regions', function (req, res) {


    res.send(JSON.stringify(regions))
});

app.get('/city', function (req, res) {


    res.send(JSON.stringify(cites))
});
app.post('/registr', function (req, res) {
    res.status(201).send(JSON.stringify({id: 40, token: 123, role: 'guest'}))
});

app.post('/auth_token', function (req, res) {
    res.status(200).send(JSON.stringify({
        id: 30,
        name: 'admin',
        role: 'admin',
        region: 'Россия',
    }))

});

app.listen(3000, function () {

    console.log('Done');
});