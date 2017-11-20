const uid = require('uid');

class Actor {
    constructor(actor) {
        this.actor = {
            "id": uid(5),
            "name": actor.name,
            "birth": actor.birth,
            "films": Number(actor.films),
            "liked": Number(actor.liked),
            "photo": actor.photo,
        }
    }

    get() {
        return this.actor;
    }

    isValid() {
        for(let elem in this.actor){
            if(!this.actor[elem]) return false;
        }
        if( /* some rules */true ) return false;
        return true;
    }
}

module.exports = Actor;
