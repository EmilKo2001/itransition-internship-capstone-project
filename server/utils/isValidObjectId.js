const mongoose = require("mongoose");

const isValidObjectId = (id) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    return String(objectId) === id;
  } catch (error) {
    return false;
  }
};

module.exports = isValidObjectId;
