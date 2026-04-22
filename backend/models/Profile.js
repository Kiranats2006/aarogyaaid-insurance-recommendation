const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    lifestyle: String,
    condition: String,
    income: String,
    city: String,
    recommendedPolicy: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports= mongoose.model("Profile", profileSchema);