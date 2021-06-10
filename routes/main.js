//main.js file
module.exports = function(app) {

    //route for the main landing page, renders the index view
    app.get("/", function(req, res) {
        res.render("index.html")
    });

    //route for the search page, renders the search view
    app.get("/search", function(req, res) {
        res.render("search.html");
    });

    //route for the about page, renders the about view
    app.get("/about", function(req, res) {
        res.render("about.html");
    });

    //route for the link tree page, renders the main view. Only navigates to this from the index.
    app.get("/main", function(req, res) {
        res.render("linkTree.html");
    });

    //route for the add foods page, renders foodAdd view
    app.get("/add", function(req, res) {
        res.render("foodAdd.html");
    });

    //route for the update page, renders the update view
    app.get("/update", function(req, res) {
        res.render("update-search.html");
    });

    //takes the selected button from the update page and processes the result
    app.get("/process-update", function(req, res) {

        //button confirms which one was selected
        let button = req.query.type;

        //the select returns the id of the line to be deleted
        let select = req.query.selection;

        //if the delete button is selected, user is asked via js script to confirm submission
        //if yes then the below is executed
        if (button == "delete") {

            //delete from the food table where the id matches the one on the entry selected
            let sqlquery = "DELETE FROM `food` WHERE id = ?";

            let body = "You have deleted id: " + select + " from the database";
            let title = "FOOD DELETED";

            db.query(sqlquery, select, (err, result) => {

                //If there is an error it will print to console, note a 0 line return will not produce an error
                if (err) {
                    return console.error("Unsuccessful trying to delete" + req.query.selection + "error: " + err.message);
                } else {
                    //Otherwise it will load the message page with the custom entries
                    res.render('message.html', {
                        message: {
                            body,
                            title
                        }
                    });
                }
            });

        } else {

            let foodid = req.query.selection;

            //select food from the food table based on the id of user the selected item
            let sqlquery = "SELECT * FROM `food` WHERE id = ?";

            db.query(sqlquery, select, (err, result) => {

                //If there is an error it will print to console, note a 0 line return will not produce an error
                if (err) {
                    return console.error("Unsuccessful trying to load that entry");
                } else {
                    //Otherwise it loads the update submit page, and passes the information from the query
                    res.render('update-submit.html', {
                        foodUpdate: result
                    });
                }
            });


        }
    });

    //This is used to navigate to from the search page, renders search-results view
    app.get("/search-result", function(req, res) {

        //pulls the keyword entered by the user in the search page
        let word = [req.query.keyword];

        //constructs the SQL statement with wildcards in place for part string searches
        let sqlquery = "SELECT * FROM `food` WHERE name like CONCAT('%',?,'%')";

        //executes the sql query replacing the placeholder with user input string
        db.query(sqlquery, word, (err, result) => {

            //If there is an error it will print to console, note a 0 line return will not produce an error
            if (err) {
                return console.error("No food found with the keyword you have entered" + req.query.keyword + "error: " + err.message);
            } else {
                //Otherwise it will load the search-results view passing the sql result, and the keyword used. Returned as an object
                //in order to use both variables.
                res.render('search-results.html', {
                    data: {
                        availableFoods: result,
                        word
                    }
                });
            }
        });
    });

    //route for the recipe page, uses a select query to pull everything from the database
    app.get("/recipe", function(req, res) {

        //basic SQL statement
        let sqlquery = "SELECT * FROM `food`";

        //executes the sql query replacing the placeholder with user input string
        db.query(sqlquery, (err, result) => {

            //If there is an error it will print to console
            if (err) {
                return console.error("The database is empty!");
            } else {
                //Otherwise it will load the recipe page, passing all the available foods
                res.render('recipe.html', {
                    data: {
                        availableFoods: result
                    }
                });
            }
        });
    });

    //gets all the results from the search to then update
    app.get("/update-select", function(req, res) {

        //pulls the keyword entered by the user in the search page
        let word = [req.query.keyword];

        //constructs the SQL statement with wildcards in place for part string searches
        let sqlquery = "SELECT * FROM `food` WHERE name like CONCAT('%',?,'%')";

        //executes the sql query replacing the placeholder with user input string
        db.query(sqlquery, word, (err, result) => {

            //If there is an error it will print to console, note a 0 line return will not produce an error
            if (err) {
                return console.error("No food found with the keyword you have entered" + word + "error: " + err.message);
            } else {
                //Otherwise it will load the search-results view passing the sql result, and the keyword used. Returned as an object
                //in order to use both variables.
                res.render('update-select.html', {
                    data: {
                        availableFoods: result,
                        word
                    }
                });
            }
        });
    });

    //This is used to navigate to from the confirmation add page, renders the message page 
    //with the customer message
    app.post("/foodadded", function(req, res) {

        //pulls the name of the food item added by the user
        let body = "You have added '" + [req.body.name] + "' to the database";
        let title = "FOOD ADDED";

        //builds the sql query to be executed
        let sqlquery = "INSERT INTO food (name, calories, fat_g, proteins_g, carbohydrates_g, sugars_g, fibre_g, sat_fats_g, sodium_mg, serve_description) VALUES (?,?,?,?,?,?,?,?,?,?)";

        //new record array is the used by the below db query to replace the placeholders
        let newrecord = [req.body.name, req.body.calories, req.body.fat, req.body.protein, req.body.carbs, req.body.sugars, req.body.fibre, req.body.satfat, req.body.salt, req.body.servingDesc];

        //then executes the sql insert with the placeholders
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                //If there is an error it will print to console, worth expanding this for more user friendly communication
                return console.error("There was an error adding the food to the database");
            } else
                //otherwise renders the foodadded page with confirmation
                res.render('message.html', {
                    message: {
                        body,
                        title
                    }
                });
        });
    });

    //This is used to navigate to from the confirmation add page, renders food added view
    app.post("/foodupdated", function(req, res) {

        //pulls the name of the food item added by the user
        let name = req.body.name;
        let body = "You have updated '" + name + "' in the database";
        let title = "FOOD UPDATED";

        //builds the sql query to be executed
        let sqlquery = "UPDATE food SET name = ?, calories = ?, fat_g = ?, proteins_g = ?, carbohydrates_g = ?, sugars_g = ?, fibre_g = ?, sat_fats_g = ?, sodium_mg = ?, serve_description = ? WHERE id = ?";

        //new record array is the used by the below db query to replace the placeholders
        let newrecord = [req.body.name, req.body.calories, req.body.fat, req.body.protein, req.body.carbs, req.body.sugars, req.body.fibre, req.body.satfat, req.body.salt, req.body.servingDesc, req.body.recID];

        //then executes the sql insert with the placeholders
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                //If there is an error it will print to console, worth expanding this for more user friendly communication
                return console.error("There was an error updating the food in the database");
            } else
                //otherwise renders the foodadded page with confirmation
                res.render('message.html', {
                    message: {
                        body,
                        title
                    }
                });
        });
    });
}