const express = require("express");
const app = express();  

const mongoose = require("mongoose");
const Listing = require("./models/listing");

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
const path = require("path")

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(port, ()=> {
    console.log(`app is listening for the port ${port}`)
});

app.get("/",(req,res) => {
  res.redirect("listing")
});
app.get("/listing", async (req,res)=> {
    const listings = await Listing.find();
    // console.log(listing);
    res.render("index", {listings});
});
