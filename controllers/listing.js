const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req, res) => {
  const {search} = req.query;
  let listings;
  if(search){
  listings = await Listing.find({
            $or: [
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
   
  }else{
  listings = await Listing.find();
  }

  if (search && listings.length === 0) {
    throw new ExpressError(404, `No listing Found for ${search}`);
  }
  
  res.render("listings/index", { listings });
};

module.exports.renderNewListingForm = (req, res) => {
  res.render("listings/new");
};

module.exports.newListing = async (req, res, next) => {

  // listing create
  const url = req.file.path;
  const filename = req.file.filename;

  req.body.listing.owner = req.user._id;
  req.body.listing.image = { filename, url };

  // Create listing document
  const newListing = new Listing(req.body.listing);

  // Geocoding
  const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    `${newListing.location}, ${newListing.country}`
  )}&format=json&limit=1`;

  const response = await fetch(geocodingUrl, {
    headers: {
      "User-Agent": "Wanderlust Learning Project"
    }
  });

  const data = await response.json();

  if (data.length === 0) {
    throw new ExpressError(404,"Location not found");
    // return res.send("Location not found");
  }

  const latitude = Number(data[0].lat);
  const longitude = Number(data[0].lon);

  // Save geometry
  newListing.geometry = {
    type: "Point",
    coordinates: [longitude, latitude]
  };

  // Save listing to MongoDB
  await newListing.save();

  req.flash("success", "listing created");
  res.redirect("/listing");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing path does not exist");
    return res.redirect("/listing");
  }
  res.render("listings/show", { listing });
};

module.exports.renderEditListingForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const imageUrl = listing.image.url.replace("/upload", "/upload/w_250");
  if (!listing) {
    req.flash("error", "listing path does not exist");
    return res.redirect("/listing");
  }
  res.render("listings/edit", { listing, imageUrl });
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (typeof req.file != "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { filename, url };
    listing.save();
  }
  req.flash("success", "listing updated");
  res.redirect(`/listing/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const result = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted");
  res.redirect("/listing");
};
