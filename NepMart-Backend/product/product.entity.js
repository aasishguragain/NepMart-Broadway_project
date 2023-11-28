import mongoose from "mongoose";

// set rule
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 55,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      minlength: 20,
      maxlength: 1000,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },

    company: {
      type: String,
      minlength: 2,
      maxlength: 55,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      min: 0,
      required: true,
    },
    color: {
      type: [String],
      required: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    sellerId: {
      type: mongoose.ObjectId, //mongoose.Schema.Types.ObjectId
      ref: "User",
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "grocery",
        "kitchen",
        "clothing",
        "electronics",
        "furniture",
        "cosmetics",
        "bakery",
        "liquor",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// create table
export const Product = mongoose.model("Product", productSchema);
