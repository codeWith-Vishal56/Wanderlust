const express = require("express");
const router = express.Router({mergeParams:true});

const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const {reviewSchema} = require("../schemaValidate");

const validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body.review);
    if(error){
    throw new ExpressError(404,error.details[0].message);
    }else{
        next();
    }
}

// Add Listing Review

router.post("/",validateReview , async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    const review = await Review.insertOne(req.body.review);

    listing.reviews.push(review);

    const result = await listing.save();
    console.log("save" ,result);
    res.redirect(`/listing/${id}`);
    
});

// Delete Review

router.delete("/:reviewId", async (req,res) => {
    const {id,reviewId} = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    const listing = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    
    res.redirect(`/listing/${id}`)
})

module.exports = router;