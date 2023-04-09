const mongoose = require('mongoose');
require("dotenv").config();
// Mongo database connection configuration 
module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
		useUnifiedTopology: true,
    }
    try {
        await mongoose.connect(process.env.MONGO_URL, connectionParams);
        console.log("Connected to database successfully")
    } catch (error) {
        console.log("Could not connect to database!")
    }
}