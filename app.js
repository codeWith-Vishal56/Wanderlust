const express = require("express");
const app = express();  

const methodOverride = require("method-override");
const ejsMate  = require('ejs-mate');


const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review = require("./models/review");

const ExpressError = require("./utils/ExpressError");
const {listingSchema,reviewSchema} = require("./schemaValidate");

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const port = 8080;
const path = require("path");
const { error } = require("console");

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(methodOverride("_method"));
app.engine('ejs', ejsMate );

app.listen(port, ()=> {
    console.log(`app is listening for the port ${port}`)
});

// ROOT PAGE

app.get("/",(req,res) => {
  res.redirect("listing")
});

// Express 5 automatically handles async errors.
// No need to wrap async routes with wrapAsync.

// SHOW ALL LISTING 

app.get("/listing", async (req,res)=> {
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

const validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body.review);
    if(error){
    throw new ExpressError(404,error.details[0].message);
    }else{
        next();
    }
}

// ADD NEW LISTING

app.get("/listing/new", (req,res) => {
    res.render("new");
});

app.post("/listing",validateListing, async (req,res,next) => {
        await Listing.insertOne(req.body.listing);
        res.redirect("/listing");
    
})

// SHOW LISTING DETAILS

app.get("/listing/:id", async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("show", {listing});
});


// Add Listing Review

app.post("/listing/:id/review",validateReview , async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    const review = await Review.insertOne(req.body.review);

    listing.reviews.push(review);

    const result = await listing.save();
    console.log("save" ,result);
    res.redirect(`/listing/${id}`);
    
});

// Delete Review

app.delete("/listing/:id/review/:reviewId", async (req,res) => {
    const {id,reviewId} = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    const listing = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    
    res.redirect(`/listing/${id}`)
})


// LISTING DETAILS EDIT 

app.get("/listing/edit/:id", async (req,res) => {
    const {id} = req.params;
    const listing       = await Listing.findById(id);
    res.render("edit", {listing});
});

app.put("/listing/:id", validateListing ,async (req,res) => {
    const {id} = req.params;
    console.log(req.body);
    const listing = await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect(`/listing/${id}`);
});

// LISTING DELETE

app.delete("/listing/:id", async (req,res) => {
    const {id} = req.params;
    const result = await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
});


app.use((req,res) => {
    throw new ExpressError(500,"Page Not Found");
})


app.use((err,req,res,next) => {
    const {statusCode = 500 , message = "something is wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error" , {err});
})
