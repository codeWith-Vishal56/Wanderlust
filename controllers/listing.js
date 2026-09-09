const Listing = require("../models/listing");

module.exports.index = async (req,res)=> {
    const listings = await Listing.find();
    res.render("listings/index", {listings});
}

module.exports.renderNewListingForm = (req,res) => {
    res.render("listings/new");
    
}

module.exports.newListing = async (req,res,next) => {
    console.log("insdie new listing");
        const url = req.file.path;
        const filename = req.file.filename;
        req.body.listing.owner = req.user._id;
        req.body.listing.image = {filename ,url};
        await Listing.insertOne(req.body.listing);
        req.flash("success", "listing created");
        res.redirect("/listing");
    
}

module.exports.showListing = async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path:"reviews",populate:{
            path:"author"
        }
    }).populate("owner");
    if(!listing){
        req.flash("error", "listing path does not exist")
        return res.redirect("/listing");
    }
    res.render("listings/show", {listing});
}

module.exports.renderEditListingForm = async (req,res) => {
    const {id} = req.params;
    const listing       = await Listing.findById(id);
    if(!listing){
        req.flash("error", "listing path does not exist")
        return res.redirect("/listing");
    }
    res.render("listings/edit", {listing});
}


module.exports.editListing = async (req,res) => {
    const {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id,req.body.listing);
    req.flash("success", "listing updated");
    res.redirect(`/listing/${id}`);
}


module.exports.destroyListing = async (req,res) => {
    const {id} = req.params;
    const result = await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted");
    res.redirect("/listing");
}


