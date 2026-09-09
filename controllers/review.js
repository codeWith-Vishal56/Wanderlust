const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.addReview = async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    req.body.review.author = req.user._id; 
    const review = await Review.insertOne(req.body.review);

    listing.reviews.push(review);

    const result = await listing.save();
    res.redirect(`/listing/${id}`);
    
};
module.exports.destroyReview = async (req,res) => {
    const {id,reviewId} = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    const listing = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    
    res.redirect(`/listing/${id}`)
}
