const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
    col: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
