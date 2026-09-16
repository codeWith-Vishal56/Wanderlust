require("dotenv").config({ path: "../.env" });

const Listing = require("../models/listing");
const initData = require("./data");
const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  await mongoose.connect(process.env.MONGODB_ATLAS_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((listing) => ({
        ...listing,
        owner: "6aaaa488e83c3051daf661ec"
    }));

    const res = await Listing.insertMany(initData.data);

    console.log("Data is inserted");
    console.log(res);
};

initDB();

console.log(initData);
