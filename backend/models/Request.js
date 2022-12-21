const { Schema, model, Types } = require("mongoose");
const requestSchema = Schema(
  {
    rating: {
      type: Number,
      default: 1,
    },
    comment: {
      type: String,
    },
    product: { type: Types.ObjectId, ref: "sales" },
    user: { type: Types.ObjectId, ref: "user" },
  },
  {timestamps: true}
);
module.exports = model("request", reviewsSchema);