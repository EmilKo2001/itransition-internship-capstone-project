const router = require("express").Router();

const mongoose = require("mongoose");
const Item = require("../models/Item");
const Collection = require("../models/Collection");

const textToSlug = require("../utils/textToSlug");
const verifyToken = require("../utils/verifyToken");
const mostFreqStr = require("../utils/mostFreqStr");
const isValidObjectId = require("../utils/isValidObjectId");

router.post("/", verifyToken, async (req, res) => {
  const { title, col, content, tags } = req.body;
  const slug = textToSlug(title);
  let newItem;

  if (req.body.tags) {
    newItem = new Item({
      title,
      slug,
      content,
      col,
      tags: tags.split(","),
    });
  } else {
    newItem = new Item({
      title,
      slug,
      content,
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
  const tag = req.query.tag;
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
    } else if (tag) {
      posts = await Item.find({
        tags: { $in: tag },
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

router.put("/:identifier", verifyToken, async (req, res) => {
  try {
    let item;
    const identifier = req.params.identifier;

    if (isValidObjectId(identifier)) {
      item = await Item.findById(identifier);
    } else {
      item = await Item.findOne({ slug: identifier });
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.username === req.body.username) {
      try {
        let newItem;
        const slug = textToSlug(req.body.title);

        if (req.body.tags) {
          newItem = {
            title: req.body.title,
            slug,
            content: req.body.content,
            tags: req.body.tags.split(","),
          };
        } else {
          newItem = {
            title: req.body.title,
            slug,
            content: req.body.content,
          };
        }

        const updatedItem = await Item.findOneAndUpdate(
          { _id: item._id },
          { $set: newItem },
          { new: true }
        );

        res.status(200).json(updatedItem);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(401).json("You can update only your item!");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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

router.get("/:identifier", async (req, res) => {
  try {
    let item;
    const identifier = req.params.identifier;

    if (isValidObjectId(identifier)) {
      item = await Item.findById(identifier);
    } else {
      item = await Item.findOne({ slug: identifier });
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
