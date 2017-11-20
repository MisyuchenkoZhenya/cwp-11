const express = require('express');
var bodyParser = require("body-parser");
const routes = require('./routes/index');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => {
    console.log('Example app listening on port 3000!')
});
