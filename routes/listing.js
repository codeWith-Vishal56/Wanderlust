const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

const ExpressError = require("../utils/ExpressError");
const {listingSchema} = require("../schemaValidate");

// Express 5 automatically handles async errors.
// No need to wrap async routes with wrapAsync.

// SHOW ALL LISTING 

router.get("/", async (req,res)=> {
    const listings = await Listing.find();
    res.render("index", {listings});
});

const validateListing = (req,res,next) => {
    const {error}= listingSchema.validate(req.body.listing);
    if(error){
    throw new ExpressError(404,error.details[0].message);
    }else{
        next();
    }
    
}


// ADD NEW LISTING

router.get("/new", (req,res) => {
    res.render("new");
});

router.post("/",validateListing, async (req,res,next) => {
        console.log("inside listing route");
        await Listing.insertOne(req.body.listing);
        req.flash("success", "listing created");
        res.redirect("/listing");
        
    
})

// SHOW LISTING DETAILS

router.get("/:id", async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "listing path does not exist")
        return res.redirect("/listing");
    }
    res.render("show", {listing});
});



// LISTING DETAILS EDIT 

router.get("/edit/:id", async (req,res) => {
    const {id} = req.params;
    const listing       = await Listing.findById(id);
    if(!listing){
        req.flash("error", "listing path does not exist")
        return res.redirect("/listing");
    }
    res.render("edit", {listing});
});

router.put("/:id", validateListing ,async (req,res) => {
    console.log("inside put req");
    const {id} = req.params;
    console.log(req.body);
    const listing = await Listing.findByIdAndUpdate(id,req.body.listing);
    req.flash("success", "listing updated");
    res.redirect(`/listing/${id}`);
});

// LISTING DELETE

router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    const result = await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted");
    res.redirect("/listing");
});


module.exports = router;