const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  targetUrl: String,
  shortId: String,
  visitHistory: [{ visitedAt: Number }],
});

const URL = mongoose.model("URL", urlSchema);

module.exports = {
  URL,
};
