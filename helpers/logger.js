const fs = require('fs');

const logPath = "./data/log.json";
let logArray = getJSON();

module.exports = (req, res, next) => {
    logArray.push({
        "date": getDate(),
        "path": req.baseUrl,
        "params": req.method === 'GET' ? req.query : req.body,
     });

    updateJson(logArray);
    next();
}

function getDate(){
    let date = new Date().toString();
    return date.split(/ /g).slice(1, 5).join(' ');
}  

function getJSON(){
    try{
      const content = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      return content;
    }
    catch(Error){
      return [];
    }
}

function updateJson(content){
    fs.writeFile(logPath, JSON.stringify(content), (err) => {
        if(err){
            console.error(err);
        }
    })
}
