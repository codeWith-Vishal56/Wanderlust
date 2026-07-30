const express = require("express");
const app = express();  

const methodOverride = require("method-override");
const ejsMate  = require('ejs-mate');


const mongoose = require("mongoose");
const Listing = require("./models/listing");

const ExpressError = require("./utils/ExpressError");

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


// ADD NEW LISTING

app.get("/listing/new", (req,res) => {
    res.render("new");
});

app.post("/listing", async (req,res,next) => {
        if(!req.body.listing){
            throw new ExpressError(400,"Send valid data for listing");
        }

        await Listing.insertOne(req.body.listing);
        res.redirect("/listing");
    
})

// SHOW LISTING DETAILS

app.get("/listing/:id", async (req,res)=> {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("show", {listing});
});


// LISTING DETAILS EDIT 

app.get("/listing/edit/:id", async (req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("edit", {listing});
});

app.put("/listing/:id", async (req,res) => {
    const {id} = req.params;
    console.log(req.body);
    const listing = await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect(`${id}`);
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
