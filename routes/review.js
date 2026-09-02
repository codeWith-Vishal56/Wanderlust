const express = require("express");
const router = express.Router({mergeParams:true});
const {isloggedin,validateReview, isAuthor} = require("../middleware");
const reviewController = require("../controllers/review");

// Add Listing Review

router.post("/",isloggedin,validateReview , reviewController.addReview);

// Delete Review

router.delete("/:reviewId", isloggedin,isAuthor,reviewController.destroyReview)

module.exports = router;