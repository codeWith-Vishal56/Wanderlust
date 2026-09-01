const express = require("express");
const router = express.Router();
const {isloggedin , isOwner, validateListing} = require("../middleware");
const listingController = require("../controllers/listing");

// Express 5 automatically handles async errors.
// No need to wrap async routes with wrapAsync.

// SHOW ALL LISTING 

router.get("/", listingController.index);


// ADD NEW LISTING

router.get("/new",isloggedin, listingController.renderNewListingForm);

router.post("/",isloggedin,validateListing, listingController.newListing)

// SHOW LISTING DETAILS

router.get("/:id",listingController.showListing);



// LISTING DETAILS EDIT 

router.get("/edit/:id",isloggedin,isOwner,listingController.renderEditListingForm);

router.put("/:id",isloggedin,isOwner, validateListing , listingController.editListing);

// LISTING DELETE

router.delete("/:id", isloggedin,isOwner,listingController.destroyListing);


module.exports = router;