const JH = require('../../helpers/json_helper');
const jsonPath = './data/actors.json';
const Actor = require('../../models/actor');
const sorting = require('../../helpers/sorting');
const fs = require('fs');
const express = require('express');

let actors = JH.loadJson(jsonPath);
const router = express.Router();

router.get('/readall', (req, res) => {
    sorting.sortByField(actors, "liked");
    res.send(actors.reverse());
});

router.get('/read', (req, res) => {
    try{
        let index = findById(req.query.id);
        res.send(actors[index]);
    }
    catch(Error){
        res.send("Wrong parameters");
    }
});

router.post('/create', (req, res) => {
    try{
        let actor = new Actor(req.body);
        if(!actor.isValid()) throw new Error;
        actors.push(actor.get());
        fs.writeFileSync(jsonPath, JSON.stringify(actors));
        res.send(actor);
    }
    catch(Error){
        res.send("Wrong parameters");
    }
});

router.post('/update', (req, res) => {
    try{
        let index = findById(req.body.id);
        for(let field in req.body){
            if(field in actors[index]){
                actors[index][field] = req.body[field];
            }
        }
        fs.writeFileSync(jsonPath, JSON.stringify(actors));
        res.send("Updating completed successfully");
    }
    catch(Error){
        res.send("Wrong parameters");
    }
});

router.post('/delete', (req, res) => {
    try{
        let index = findById(req.body.id);
        actors.splice(index, 1);
        fs.writeFileSync(jsonPath, JSON.stringify(actors));
        res.send("Removing completed successfully");
    }
    catch(Error){
        res.send("Wrong parameters");
    }
});


function findById(id){
    let index = actors.findIndex(o => o.id === id);
    if(index === -1) throw new Error;
    return index;
}

module.exports = router;
