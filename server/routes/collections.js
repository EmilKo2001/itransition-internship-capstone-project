const router = require("express").Router();

const Collection = require("../models/Collection");
const Item = require("../models/Item");

const textToSlug = require("../utils/textToSlug");
const verifyToken = require("../utils/verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;
  const slug = textToSlug(name);
  const newCol = new Collection({ name, slug, author: req.user._id });
  try {
    const savedCol = await newCol.save();
    res.status(200).json(savedCol);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let collections;

    if (req.query.hasOwnProperty("largest")) {
      collections = await Collection.find()
        .sort({ ItemsCount: -1 })
        .limit(5)
        .populate("author", "fullname");
    } else {
      collections = await Collection.find().populate("author", "fullname");
    }

    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const collection = await Collection.findOne({ slug });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.status(200).json(collection);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:slug", verifyToken, async (req, res) => {
  const { slug } = req.params;
  const { name } = req.body;

  try {
    const collection = await Collection.findOne({ slug });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    collection.name = name;
    collection.slug = textToSlug(name);

    const updatedCol = await collection.save();

    res.status(200).json(updatedCol);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:slug", verifyToken, async (req, res) => {
  const { slug } = req.params;

  try {
    const collection = await Collection.findOne({ slug });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    if (collection.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Permission denied" });
    }

    await collection.remove();

    // FIX: Deprecation Warning
    await Item.deleteMany({ col: mongoose.Types.ObjectId(collection._id) });

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
