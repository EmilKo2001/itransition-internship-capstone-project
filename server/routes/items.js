const router = require("express").Router();

const mongoose = require("mongoose");
const Item = require("../models/Item");
const Collection = require("../models/Collection");

const textToSlug = require("../utils/textToSlug");
const verifyToken = require("../utils/verifyToken");
const mostFreqStr = require("../utils/mostFreqStr");

router.post("/", verifyToken, async (req, res) => {
  const { title, col, tags } = req.body;
  const slug = textToSlug(title);
  let newItem;

  if (req.body.tags) {
    newItem = new Item({
      title,
      slug,
      col,
      tags: tags.split(","),
    });
  } else {
    newItem = new Item({
      title,
      slug,
      col,
    });
  }

  try {
    const savedItem = await newItem.save();
    await Collection.findByIdAndUpdate(col, {
      $inc: { itemsCount: 1 },
    });
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
        .populate({
          path: "col",
          select: "name slug author",
          populate: {
            path: "author",
            select: "fullname",
          },
        });
    } else {
      posts = await Item.find()
        .sort({ createdAt: -1 })
        .populate({
          path: "col",
          select: "name slug author",
          populate: {
            path: "author",
            select: "fullname",
          },
        });
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

router.get("/tags", async (req, res) => {
  try {
    const items = await Item.find();
    const tags = mostFreqStr(items.map((obj) => obj.tags).flat());

    res.status(200).json(tags);
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
