module.exports.isloggedin = (req,res,next) => {
    req.session.redirectUrl = req.originalUrl;
    console.log(req.session.redirectUrl);   
    if(!req.isAuthenticated()){
        req.flash("error", "Please log in");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
    }
    console.log(res.locals.redirectUrl);
    next();
}