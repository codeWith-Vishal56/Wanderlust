const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing");
const Review = require("../models/review");
const {isloggedin,validateReview, isAuthor} = require("../middleware");

// Add Listing Review

router.post("/",isloggedin,validateReview , async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    req.body.review.author = req.user._id; 
    const review = await Review.insertOne(req.body.review);

    listing.reviews.push(review);

    const result = await listing.save();
    console.log("save" ,result);
    res.redirect(`/listing/${id}`);
    
});

// Delete Review

router.delete("/:reviewId", isloggedin,isAuthor,async (req,res) => {
    const {id,reviewId} = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    const listing = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    
    res.redirect(`/listing/${id}`)
})

module.exports = router;