const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemsCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);
