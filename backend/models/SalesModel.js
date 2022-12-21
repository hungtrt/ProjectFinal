const mongoose = require("mongoose");
const salesSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    discount: {
      required: true,
      type: Number,
    },
    stock: {
      required: true,
      type: Number,
    },
    category: {
      required: true,
      type: String,
    },
    colors: {
      type: [Map],
    },
    sizes: {
      type: [Map],
    },
    image1: {
      required: true,
      type: String,
    },
    image2: {
      required: true,
      type: String,
    },
    image3: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    request: [{ type: mongoose.Types.ObjectId, ref: "request" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("sale", salesSchema);
