//main.js file
module.exports = function(app) {

    //route for the main landing page, renders the index view
    app.get("/", function(req, res) {

        let sqlquery = "SELECT * FROM users"

        db.query(sqlquery, (error, results, fields) => {

            let user = results[0];
            
            res.render("index.html", { user });  
        });

    });

}