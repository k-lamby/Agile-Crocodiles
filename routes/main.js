//main.js file
module.exports = function(app) {

    //route for the main landing page, renders the index view
    app.get("/", function(req, res) {
        res.render("index.html")
    });

}