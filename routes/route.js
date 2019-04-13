const routes = require('express').Router();
const db = require("../db").getDB();
const scheduleSMS = require('../helpers/index').scheduleSMS
routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

routes.post('/api/users', function (req, res) {
    console.log(req.body)
    userDBName = process.env.UserDBName
    console.log(typeof userDBName)
    var name = req.body.Name
    var email = req.body.Email
    var phoneno = req.body.PhoneNo
    var myobj = { name, email, phoneno };
    const db = require("../db").getDB();
    db.collection(userDBName).insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("User document inserted");
    });
    res.send(200, "Spoiler will be sent.");
});


routes.post('/addSpoiler', async function (req, res) {
    const db = require("../db").getDB();
    spoilerDBName = process.env.SpoilerDBName
    let content = req.body.Content
    let category = req.body.Category
    let type = req.body.Type
    let spoilerObj = { content, category, type };
    mongores = await db.collection(spoilerDBName).insertOne(spoilerObj)
    scheduleSMS(mongores.insertedId)
    resData = { "data": mongores.insertedId }
    res.status(200).send(resData);
});

routes.get('/getUsers', async function (req, res) {
    userDBName = process.env.UserDBName
    const db = require("../db").getDB();
    mongores = await db.collection(userDBName).find({}).toArray();
    console.log(mongores)
    res.status(200).send(mongores);
});
module.exports = routes;