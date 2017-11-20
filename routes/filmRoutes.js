const JH = require('../helpers/json_helper');
const jsonPath = './data/top250.json';
const Film = require('../models/film');
const sorting = require('../helpers/sorting');
const fs = require('fs');
const express = require('express');

let films = JH.loadJson(jsonPath);
const router = express.Router();

router.get('/readall', (req, res) => {
    res.send(films);
});

router.get('/read', (req, res) => {
    try{
        let index = findById(req.query.id);
        res.send(films[index]);
    }
    catch(Error){
        res.send("Wrong parameters");
    }
});

router.post('/create', (req, res) => {
    try{
        req.body.position = getRightPosition();
        let film = new Film(req.body);
        if(!film.isValid()) throw new Error;
        films.push(film.get());
        sorting.sortByField(films, "position");
        fs.writeFileSync(jsonPath, JSON.stringify(films));
        res.send(film);
    }
    catch(Error){
        res.send("Wrong parameters");
    }
});

router.post('/update', (req, res) => {
    try{
        let index = findById(req.body.id);
        for(let field in req.body){
            if(field in films[index]){
                films[index][field] = req.body[field];
            }
        }
        sorting.sortByField(films, "position");
        correctPositions(0);
        fs.writeFileSync(jsonPath, JSON.stringify(films));
        res.send("Updating completed successfully");
    }
    catch(Error){
        res.send("Wrong parameters");
    }
});

router.post('/delete', (req, res) => {
    try{
        let index = findById(req.body.id);
        films.splice(index, 1);
        correctPositions(index);
        fs.writeFileSync(jsonPath, JSON.stringify(films));
        res.send("Removing completed successfully");
    }
    catch(Error){
        res.send("Wrong parameters");
    }
});


function getRightPosition() {
    let pos = -1;
    for(let i = 0; i < films.length; i++){
        if(films[i].position !== i + 1) {
            pos = i + 1;
            break;
        }
    }
    if(pos < 0) pos = films.length + 1;
    return pos;
}

function correctPositions(start){
    for(let i = start; i < films.length; i++){
        films[i].position = i + 1;
    }
}

function findById(id){
    let index = films.findIndex(o => o.id === id);
    if(index === -1) throw new Error;
    return index;
}

module.exports = router;
