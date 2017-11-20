const fs = require('fs');

function loadJson(path){
    let context = '[]';
    
    if(fs.existsSync(path) && fs.statSync(path).isFile){
        context = fs.readFileSync(path, { encoding: "utf8" });
    }
    else{
        console.log("ERROR: wrong file path.");
    }
    return JSON.parse(context);
}

module.exports = {
    loadJson: loadJson,
}
