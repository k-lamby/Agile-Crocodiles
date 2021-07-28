module.exports = function(app){

    app.get("/",function(req, res){
        res.render("index.ejs", {title: "Main"})
    })

    app.get("/match",function(req, res){
        res.render("match.ejs", {title: "Match"})
    })

    app.get("/profile",function(req, res){
        res.render("profile.ejs", {title: "Profile"})
    })

    app.get("/wishlist",function(req, res){
        res.render("wishlist.ejs", {title: "Wishlist"})
    })

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
