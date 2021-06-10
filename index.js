const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT;
const path = require('path');

app.use(bodyParser.urlencoded({
    extended: true
}));

//set database info
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

global.db = db;

require("./routes/main")(app);

app.set("view engine", "ejs");

app.engine("html", require("ejs").renderFile);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//assist with css and js files being added to the project
app.set("views", __dirname + "/views");
app.use('/views', express.static(__dirname + '/views'));
app.use('/js', express.static(__dirname + '/js'));
