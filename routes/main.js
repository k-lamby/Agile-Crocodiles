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
        console.log("A post request was made to /register/new-user");
    })
}
