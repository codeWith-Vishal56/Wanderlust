if(process.env.NODE_ENV != "production" ){
    require('dotenv').config();
}

const express = require("express");
const app = express();  

const methodOverride = require("method-override");
const ejsMate  = require('ejs-mate');


const mongoose = require("mongoose");

const ExpressError = require("./utils/ExpressError");


const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

const session = require('express-session');
const flash = require('connect-flash');

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");


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

const sessionOption ={
    secret:"theSessionSecretCode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 *1000,
        maxAge:7 * 24 * 60 * 60 *1000,
        httpOnly:true
    }

}

app.use(session(sessionOption));
app.use(flash());

// using passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(port, ()=> {
    console.log(`app is listening for the port ${port}`)
});

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ROOT PAGE

app.get("/",(req,res) => {
  res.redirect("listing")
});

app.use("/listing",listingRouter);
app.use("/listing/:id/review",reviewRouter);
app.use("/",userRouter);



app.use((req,res) => {
    throw new ExpressError(500,"Page Not Found");
})


app.use((err,req,res,next) => {
    const {statusCode = 500 , message = "something is wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error" , {err});
})
