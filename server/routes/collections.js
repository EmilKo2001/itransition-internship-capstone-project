const router = require("express").Router();

const Collection = require("../models/Collection");

const textToSlug = require("../utils/textToSlug");
const verifyToken = require("../utils/verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;
  const slug = textToSlug(name);
  console.log("req.user.fullname ", req.user);
  const newCol = new Collection({ name, slug, author: req.user.fullname });
  try {
    const savedCol = await newCol.save();
    res.status(200).json(savedCol);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
