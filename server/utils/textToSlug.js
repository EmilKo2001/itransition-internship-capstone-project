var slugify = require("slugify");

function textToSlug(text) {
  return slugify(text);
}

module.exports = textToSlug;
