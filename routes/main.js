module.exports = (app) => {
    let bookInfo = [] // To store json objects for books in the wish list.
    queryWishlist(); // Get the wish list beforehands.

    app.get("/",(req, res) => {
        res.render("index.ejs", {title: "Main"});
    })

    app.get("/match",(req, res) => {
        res.render("match.ejs", {title: "Match"});
    })

    app.get("/profile",(req, res) => {
        let query = ["SELECT preference FROM userProfile WHERE userIDNum = 9"]
        connection.query(query.join(";"), (err, results) => {
            if(err) throw err;
            genreList = results[0].preference.split(";"); //tokenize the user preference string by ";"
            genreList.pop(); // remove the last element in the array which is an empty string.
            res.render("profile.ejs", {title: "Profile", genreList : genreList});
        });
    })

    app.post("/profile", (req, res) => {
        let preference = savePreference(req.body.genre);
        let query = ["INSERT INTO userProfile (userIDNum, preference) VALUES (9, " + preference + ")"];
        connection.query(query.join(";"), (err, results) => {
            if (err) // If INSERT fails, then there is already a saved preference for this user. So, UPDATE is required.
            {
                let query = ["UPDATE userProfile SET preference = '" + preference + "' WHERE USERIDNum = 9"];
                connection.query(query.join(";"), (err, results) => {
                    if(err) throw err;
                    console.log("User preference has been saved.")
                });
            }
            else {
                res.render("profile.ejs", {title: "Profile"}); // INSERT is successful.
            }
        })
        res.render("profile.ejs", {title: "Profile"}); // UPDATE is successful.
    });

    //savePreference function processes the user's genre choices by concatenating them in a one single string by semi-colon
    // and save it to the DB. 
    function savePreference(input) 
    {
        if(typeof input == "string") // Only one genre was selected by the user. 
        {
            return input + ";"
        }
        else{
            let preference = ""
            for(let i = 0; i < input.length; i++)
            {
                preference = preference + input[i]+";"
            }
            return preference
        }
    }

    app.get("/wishlist", (req, res) => {
        var clean = bookInfo.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.title === arr.title && t.cover === arr.cover))); // remove duplicate json from bookInfo
        res.render("wishlist.ejs", {title: "Wishlist", bookInfo : clean});
    })

    function formatData (queryResults)
    {
        let json = {
            title : queryResults[0][0].name,
            author : queryResults[1][0].name,
            cover : queryResults[2][0].link
        };
        bookInfo.push(json);      
    }

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

    app.post("/wishlist/remove", (req, res) => {
        bookInfo.splice(bookInfo.findIndex((element) => element.title == req.body.title), 1); // remove book from the array
        let query = ["DELETE FROM wishlist WHERE titleID = (SELECT ID FROM title WHERE name = '" + req.body.title+"')"];
        connection.query(query.join(';'), (err, results) => {
            console.log("A book is removed from the wishlist");
            if (err) throw err;
            res.redirect("/wishlist");
        })
    });

    app.post("/wishlist/oneliner", (req, res) => {
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

    app.get("/register",(req, res) => {
        res.render("register.ejs", {title: "Registration"})
    })

    app.post("/login", (req, res)=> {
        console.log("A post request was made to /login");
    })

    app.post("/register/new-user", (req, res) => {
        if(req.body.registerPassword === req.body.registerPasswordConfirm) // check if password and password confirm are the same
        {
            let query = "INSERT INTO credential (userID, password) VALUES ('" + req.body.registerUsername + "','" + req.body.registerPassword + "');"
            connection.query(query, (err, results) =>{
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

    app.get("/form", (req, res) =>{
        let info = {
            title : "",
            author : "",
            cover : "",
            ISBN : "",
            description : ""
        }
        res.render("form.ejs", {title: "Form", result : info });
    })

    app.post("/form", (req, res) =>{
        let url = "https://www.googleapis.com/books/v1/volumes?q="+req.body.title+"+inauthor:"+req.body.author+"&key=AIzaSyDUce_hTpbDcVBlm5h7TgExyjZ-httMvNk&maxResults=1";
        request(url, {json: true}, (err, response, body)=> {

            let info = {
                title : "",
                author : "",
                cover : "",
                ISBN : "",
                description : ""
            }
    
            if(err) return console.log(err);
            info.title = body.items[0].volumeInfo.title;
            info.author = body.items[0].volumeInfo.authors;
            info.publisher = body.items[0].volumeInfo.publisher;
            info.ISBN = body.items[0].volumeInfo.industryIdentifiers[1].identifier;
            info.cover = body.items[0].volumeInfo.imageLinks.thumbnail;
            info.description = body.items[0].volumeInfo.description;

            res.render("form.ejs", {title : "Form", result : info})
        })
    })
}
