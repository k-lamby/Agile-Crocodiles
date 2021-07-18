const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express(); 
const port = 3000

const hostname = '127.0.0.1';

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({cookie : {maxAge: null}}));
app.use((req, res, next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bibliophile',
  multipleStatements: true
});

connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("successfully connected to the database");
});

global.connection = connection;

require("./routes/main")(app);
app.set("views",__dirname + "/views");
app.use("/style",express.static(__dirname +"/style")); // allowing css style to be applied,
app.use("/script",express.static(__dirname +"/script"));
app.set("view engine", "ejs"); // if EJS is used.
app.engine("html", require("ejs").renderFile); // if EJS is used.
app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
