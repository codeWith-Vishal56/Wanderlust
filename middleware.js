const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const {listingSchema} = require("./schemaValidate");
const {reviewSchema} = require("./schemaValidate");

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
    next();
} 

module.exports.isOwner = async (req,res ,next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not authorised Person");
       return  res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
    const {error}= listingSchema.validate(req.body.listing);
    if(error){
    throw new ExpressError(404,error.details[0].message);
    }else{
        next();
    }
    
}

module.exports.validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body.review);
    if(error){
    throw new ExpressError(404,error.details[0].message);
    }else{
        next();
    }
}

module.exports.isAuthor = async (req,res ,next) => {
    const {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not authorised Person");
       return  res.redirect(`/listing/${id}`);
    }
    next();
}