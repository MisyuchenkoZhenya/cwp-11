const JH = require('../helpers/json_helper');
const uid = require('uid');

class Film {
    constructor(film) {
        this.film = {
            "id": uid(5),
            "title": film.title,
            "rating": film.rating,
            "year": Number(film.year),
            "budget": Number(film.budget),
            "gross": Number(film.gross),
            "poster": film.poster,
            "position": Number(film.position),
        }
    }

    get() {
        return this.film;
    }

    isValid() {
        for(let elem in this.film){
            if(!this.film[elem]) return false;
        }
        if( this.film.year < 1895 ||
            this.film.budget < 0 || 
            this.film.gross < 0) return false;
        return true;
    }
}

module.exports = Film;
