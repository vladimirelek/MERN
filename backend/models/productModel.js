const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: {
    type: String, // Putanja ili URL slike
    required: [true, "Image is required"],
  },
  category: {
    type: String,
    enum: ["Bicikl", "Steper", "Traka"],
    required: [true, "Category is required"],
  },
  rating: {
    type: Number,
    default: 0, // Početni rejting ako nema ocena
  },
  allRatings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      star: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
