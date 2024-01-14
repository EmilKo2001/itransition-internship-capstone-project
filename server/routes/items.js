const router = require("express").Router();

const mongoose = require("mongoose");
// const User = require("../models/User");
const Item = require("../models/Item");

const textToSlug = require("../utils/textToSlug");
const verifyToken = require("../utils/verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const { title, col } = req.body;
  const slug = textToSlug(title);
  const newItem = new Item({
    title,
    slug,
    col,
    author: req.user.fullname,
  });
  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const colId = req.query.col;
  try {
    let posts;
    if (colId) {
      posts = await Item.find({
        col: {
          $eq: mongoose.Types.ObjectId(colId),
        },
      })
        .sort({ createdAt: -1 })
        .populate("col", "name slug");
    } else {
      posts = await Item.find()
        .sort({ createdAt: -1 })
        .populate("col", "name slug");
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item.username === req.body.username) {
      try {
        const updateditem = await Item.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateditem);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your item!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item.username === req.body.username) {
      try {
        await item.delete();
        res.status(200).json("Item has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your item!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
