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
        res.redirect("/listing");
    
})

// SHOW LISTING DETAILS

router.get("/:id", async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("show", {listing});
});



// LISTING DETAILS EDIT 

router.get("/edit/:id", async (req,res) => {
    const {id} = req.params;
    const listing       = await Listing.findById(id);
    res.render("edit", {listing});
});

router.put("/:id", validateListing ,async (req,res) => {
    console.log("inside put req");
    const {id} = req.params;
    console.log(req.body);
    const listing = await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect(`/listing/${id}`);
});

// LISTING DELETE

router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    const result = await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
});


module.exports = router;