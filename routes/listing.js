const express = require("express");
const router = express.Router();
const { isloggedin, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listing");

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

// Express 5 automatically handles async errors.
// No need to wrap async routes with wrapAsync.

// SHOW ALL LISTING AND CREATE NEW LISTING

router
  .route("/")
  .get(listingController.index)
  // .post(isloggedin, validateListing, listingController.newListing);
  .post(upload.single('listing[image][url]'),(req,res) => {
    res.send(req.file);
  });

// ADD NEW LISTING

router.get("/new", isloggedin, listingController.renderNewListingForm);

// SHOW LISTING DETAILS & LISTING DETAILS EDIT & LISTING DELETE

router
  .route("/:id")
  .get(listingController.showListing)
  .put(isloggedin, isOwner, validateListing, listingController.editListing)
  .delete(isloggedin, isOwner, listingController.destroyListing);

// LISTING DETAILS EDIT FORM

router.get(
  "/edit/:id",
  isloggedin,
  isOwner,
  listingController.renderEditListingForm,
);

module.exports = router;
