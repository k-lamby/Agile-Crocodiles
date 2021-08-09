module.exports = function(app){
    let bookInfo = [] // To store json objects for books in the wish list.
    queryWishlist(); // Get the wish list beforehands.

    app.get("/",function(req, res){
        res.render("index.ejs", {title: "Main"})
    })

    app.get("/match",function(req, res){
        res.render("match.ejs", {title: "Match"})
    })

    app.get("/profile",function(req, res){
        res.render("profile.ejs", {title: "Profile"})
    })

    app.get("/wishlist", function(req, res){
        var clean = bookInfo.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.title === arr.title && t.cover === arr.cover))) // remove duplicate json from bookInfo
        res.render("wishlist.ejs", {title: "Wishlist", bookInfo : clean});
    })

    // formatData function process the result of a query by converting it into a JSON object and pushing it to bookInfo array.
    function formatData(queryResult)
    {
        let json = {
            title : queryResult[0][0].name,
            author : queryResult[1][0].name,
            cover : queryResult[2][0].link
        };
        bookInfo.push(json);      
    }

    //queryWishlist function handles nested queries by returing promises. Every query result will be stored on bookInfo.
    function queryWishlist(){
        let id = "user1";
        let query = ["SELECT * FROM wishlist WHERE userIDNum = (SELECT ID FROM credential WHERE userID ='" + id +"')"];
        return new Promise((resolve, reject) => {
            connection.query(query.join(';'), (err, results) =>{
            if(err) reject(err);
            for(let i = 0; i < results.length; i++)
                    {
                        let innerQuery = ["SELECT name FROM title WHERE ID = " + results[i].titleID, 
                                        "SELECT name FROM author WHERE ID = (SELECT authorID FROM title where ID = " + results[i].titleID + ")",
                                        "SELECT link FROM cover WHERE titleID = " + results[i].titleID];
                        
                        connection.query(innerQuery.join(';'), (err, qResults) => {
                            if (err) reject(err);
                            else
                                resolve(formatData(qResults));
                        });
                    }
            })
        })
    }

    app.post("/wishlist/remove", function(req, res){
        bookInfo.splice(bookInfo.findIndex((element) => element.title == req.body.title), 1); // remove book from the array
        let query = ["DELETE FROM wishlist WHERE titleID = (SELECT ID FROM title WHERE name = '" + req.body.title+"')"];
        connection.query(query.join(';'), (err, results) => {
            console.log("A book is removed from the wishlist");
            if (err) throw err;
            res.redirect("/wishlist");
        })
    });

    app.post("/wishlist/oneliner", function(req, res){
        bookInfo.splice(bookInfo.findIndex((element) => element.title == req.body.title), 1); // remove book from the array
        let query = ["INSERT INTO oneliner VALUES ((SELECT ID FROM title WHERE name = '" + req.body.modalTitle + "'), 9 ,'" + req.body.oneliner+ "');"];
        connection.query(query.join(';'), (err, results) => {
            console.log("One liner is added to the DB.");
            if (err) throw err;

            req.session.message = {
                type: 'success',
                intro: 'Thank you!',
                message: 'Your one liner is successfully added.'
            }
            res.redirect("/wishlist");
        })
    });

    app.get("/register",function(req, res){
        res.render("register.ejs", {title: "Registration"})
    })

    app.post("/login",function(req, res){
        console.log("A post request was made to /login");
    })

    app.post("/register/new-user",function(req, res){
        if(req.body.registerPassword === req.body.registerPasswordConfirm) // check if password and password confirm are the same
        {
            let query = "INSERT INTO credential (userID, password) VALUES ('" + req.body.registerUsername + "','" + req.body.registerPassword + "');"
            connection.query(query, (err, results)=>{
                if(err) // Since USER ID is set to "UNIQUE", an exception will be thrown if the same userID already exists. 
                {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Username Conflict!',
                        message: 'The same username is already being used by another user. Please choose another username.'
                    }
                    res.redirect('/register');
                } 
                // if there is no duplicate USER ID in the database
                else{
                    req.session.message = {
                        type: 'success',
                        intro: 'Registration successful!',
                        message: 'You are successfully registered. Please log in.'
                    }
                    res.redirect('/register');
                }
            })
        }
        else{ // Passwords do not match
            req.session.message = {
                type: 'danger',
                intro: 'Unmatched passwords',
                message: 'The provided passwords do not match.'
            }
            res.redirect('/register');
        }
        console.log("A post request was made to /register/new-user");
    })
}
