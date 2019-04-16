const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pgp = require("pg-promise")(/*options*/);
const query = require('./database.js');

const database = pgp({host: '82.146.58.11', user: 'postgres', port: '5432', database: 'new_db', password: '123'});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const cites = [];
const attrsAll = [];
const regions = [];

const DBind = (query, method) => (
    database[method](query, null).catch((error) => (console.error(`Database Error: ${query} \n`, error)))
);

const updateDBInfo = async () => {
    cites.splice(0, cites.length);
    attrsAll.splice(0, attrsAll.length);
    regions.splice(0, regions.length);

    cites.push(...await DBind(query.selectCites, 'many'));
    attrsAll.push(...await DBind(query.selectAttrs, 'many'));
    const data_regions = await DBind(query.selectRegions, 'many');
    for (let elem of data_regions) {regions.push(elem.name)}
};

updateDBInfo();


const generateToken = () => {
    return 123;
};


app.get('/regions', (req, res) => {
    res.send(JSON.stringify(regions))
});

app.put('/city/:uid', async (req, res) => {
    const {id, city, region} = req.body;

    const regionInfo = await DBind(query.selectRegion(region), 'oneOrNone') || await DBind(query.createRegion(region), 'one');
    await DBind(query.changeCity(id, city, regionInfo.id), 'none');

    updateDBInfo();
    res.send(JSON.stringify(req.body))
});

app.post('/city', async (req, res) => {
    const {name, region} = req.body;

    const regionInfo = await DBind(query.selectRegion(region), 'oneOrNone') || await DBind(query.createRegion(region), 'one');
    const city = await DBind(query.createCity(name, regionInfo.id), 'one');

    updateDBInfo();
    res.send(JSON.stringify({id: city.id, city: name, region}))
});

app.delete('/city/:uid', async (req, res) => {
    await DBind(query.deleteCity(req.params.uid), 'none');

    updateDBInfo();
    res.send('OK')
});


app.get('/city/attributes/:uid/', async (req, res) => {
    const data = await DBind(query.selectOptions(req.params.uid), 'manyOrNone');

    res.send(JSON.stringify(data.map((currValue) => (
        currValue.value === 'false' ? {...currValue, value: false} :
            currValue.value === 'true' ? {...currValue, value: true} :
                currValue
    ))))
});

app.get('/city', (req, res) => {
    res.send(JSON.stringify(cites))
});

app.get('/attributes/', (req, res) => {
    res.send(JSON.stringify(attrsAll))
});

app.put('/attributes/:uid', async (req, res) => {
    await DBind(query.changeAttr(req.params.uid, req.body), 'none');

    updateDBInfo();
    res.send(JSON.stringify(req.body))
});

app.delete('/attributes/:uid', async (req, res) => {
    await DBind(query.deleteAttr(req.params.uid), 'none');

    updateDBInfo();
    res.send('OK')
});

app.post('/attributes', async (req, res) => {
    const {id_city, name, value} = req.body;

    await DBind(query.createOptionalOptions(name), 'none');
    const id_option = await DBind(query.selectOptionID(name), 'one');
    await DBind(query.createOptionalOptionsValue(id_city, id_option.id, value), 'none');

    res.send(JSON.stringify({id: id_option, name, value}))
});

app.post('/registr', async (req, res) => {
    const {login, password, region} = req.body;
    const user = await DBind(query.createUser(login, password, region), 'one');

    res.status(201).send(JSON.stringify({...user, token: generateToken() }))
});

app.post('/auth_token', (req, res) => {

    res.status(200).send(JSON.stringify({
        id: 30,
        name: 'admin',
        role: 'admin',
        region: 'Россия',
    }))

});

app.post('/auth', (req, res) => {
    if (req.body.login === 'admin' && req.body.password === 'merve') {
        res.status(200).send(JSON.stringify({region: 'Россия', id: 30, token: 123, role: 'admin'}))
    } else {
        res.status(401).send('User not found')
    }
});

app.listen(port, () => {
    console.dir(`Server run on ${port} port`);
});