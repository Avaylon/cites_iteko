
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

const updateDBInfo = () => {
    db.many(db_query.selectCites, null)
        .then((data) => {
            cites.splice(0, cites.length);
            cites.push(...data)
        })
        .catch((error) => {
            console.log("ERROR CITES:", error);
        });


    db.many(db_query.selectAttrs, null)
        .then((data) => {
            attrsAll.splice(0, attrsAll.length);
            attrsAll.push(...data)
        })
        .catch((error) => {
            console.log("ERROR ATTRS:", error);
        });

    db.many(db_query.selectRegions, null)
        .then((data) => {
            regions.splice(0, regions.length);
            for (let elem of data) {
                regions.push(elem.name)
            }

        })
        .catch((error) => {
            console.log("ERROR REGIONS:", error);
        });
};


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/auth', (req, res) => {

    if (req.body.login === 'admin' && req.body.password === 'merve') {
        res.status(200).send(JSON.stringify({region: 'Россия', id: 30, token: 123, role: 'admin'}))
    } else {
        res.status(401).send('User not found')
    }


});

const changeCity = (id, name, id_region) => db.none(db_query.changeCity( id, name, id_region ), null)
    .catch((error) => (console.error('change', error)));
const createRegion = (name) => db.none(db_query.createRegion(name), null)
    .catch((error) => (console.error('create', error)));
const searchRegion = (region) => db.oneOrNone(db_query.selectRegion(region), null)
    .catch((error) => (console.error('search', error)));

app.put('/city/:uid', async (req, res) => {
    const {id, city, region} = req.body;

    let regionInfo = await searchRegion(region);
    if (!regionInfo ) {
        await createRegion(region);
        regionInfo = await searchRegion(region);
    }

    await changeCity( id, city, regionInfo.id) ;
    updateDBInfo();
    res.send(JSON.stringify(req.body))
});


app.put('/attributes/:uid', (req, res) => {
    db.manyOrNone(db_query.changeAttr(req.params.uid, req.body), null)
        .then(() => {
            updateDBInfo();
            res.send(JSON.stringify(req.body))
        })
        .catch((error) => {
            console.log("ERROR UPDATE:", error);
            res.status(404).end()
        });
});

app.get('/attributes/', (req, res) => {
    res.send(JSON.stringify(attrsAll))
});

app.delete('/attributes/:uid', (req, res) => {
    db.none(db_query.deleteAttr(req.params.uid), null)
        .then(() => {
            updateDBInfo();
            res.send('OK')
        })
        .catch((error) => {
            console.log("ERROR DELETE:", error);
            res.status(404).end()
        });
});

app.delete('/city/:uid', (req, res) => {
    db.none(db_query.deleteCity(req.params.uid), null)
        .then( () => {
            updateDBInfo();
            res.send('OK');
        })
        .catch( (error) => {
            console.log("ERROR DELETE:", error);
            res.status(404).end()
        });
});


app.get('/city/attributes/:uid/', (req, res) => {
    db.many(db_query.selectOptions(req.params.uid), null)
        .then( (data) => {
            res.send(JSON.stringify(data.map((currValue) => (
                currValue.value === 'false' ? {...currValue, value: false} :
                    currValue.value === 'true' ? {...currValue, value: true} :
                        currValue
            ))))
        })
        .catch((error) => {
            if (error.code === 0) {
                res.status(404).end();
            }
        });
});

app.post('/attributes', async (req, res) => {
    const {id_city, name, value} = req.body;


    await db.none(db_query.createOptionalOptions(name), null)
        .catch( (error) => (console.error('createOptions', error)) );
    const id_option = await db.none(db_query.selectOptionID(name), null)
        .catch( (error) => (console.error('searchID', error)) );
    await db.none(db_query.createOptionalOptionsValue(id_city, id_option, value), null)
        .catch( (error) => (console.error('createOptions_value', error)) );

    res.send(JSON.stringify({...req.body, id_option}))
});

var id_city = 1000
app.post('/city', (req, res) => {


    id_city++

    var obj = {id: id_city, city: req.body.name, region: req.body.region}
    cites.push(obj)

    res.send(JSON.stringify(obj))
});

app.get('/regions', (req, res) => {


    res.send(JSON.stringify(regions))
});

app.get('/city', (req, res) => {


    res.send(JSON.stringify(cites))
});
app.post('/registr', (req, res) => {
    res.status(201).send(JSON.stringify({id: 40, token: 123, role: 'guest'}))
});

app.post('/auth_token', (req, res) => {
    res.status(200).send(JSON.stringify({
        id: 30,
        name: 'admin',
        role: 'admin',
        region: 'Россия',
    }))

});

app.listen(3000, () => {
    updateDBInfo();
    console.log('Done');
});