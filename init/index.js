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
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((listing) => ({
        ...listing,
        owner: "6a8fd7edd8c5a8b665203c04"
    }));

    const res = await Listing.insertMany(initData.data);

    console.log("Data is inserted");
    console.log(res);
};

initDB();

console.log(initData);
