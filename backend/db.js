const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/backend";
const connectToMongo = () =>{
    mongoose.connect(mongoURI)
    .then(() => {
            console.log("Connected to Mongo successfully");
        })
        .catch((err) => {
            console.error("Mongo connection error:", err);
        });
}
module.exports = connectToMongo;