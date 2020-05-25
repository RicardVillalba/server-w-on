const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: "User" },
    season: {type: String, enum:["autumn-fall","spring-summer"]},
    imageUrl: String
});
const Favorite = mongoose.model("Favorite",favoriteSchema)
module.exports = Favorite;





