const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
	user: {type: ObjectId, ref: "User" },
    season: {type: String, enum:["autumn-fall","spring-summer"]},
    imageUrl: String,
});

module.exports = Favorite;
