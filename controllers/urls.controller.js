const { URL } = require("../models/url.model");
const { nanoid } = require("nanoid");

async function handleCreateShortUrl(req, res) {
  if (req.body.targetUrl) {
    const targetUrl = req.body.targetUrl;
    const shortId = nanoid(11);
    try {
      await URL.create({
        targetUrl: targetUrl,
        shortId: shortId,
        visitHistory: [],
      });
      return res.status(201).json({ message: "success", shortId: shortId });
    } catch (err) {
      return res.status(500).json({ message: "internal server error: ", err });
    }
  } else {
    return res.json(400).json({ message: "targetUrl is required!" });
  }
}

async function handleVistUrl(req, res) {
  const shortId = req.params.shortId;
  const urlEntry = await URL.findOne({ shortId: shortId });
  if (urlEntry) {
    const redirectUrl = urlEntry.targetUrl;
    await URL.findOneAndUpdate(
      { shortId: urlEntry.shortId },
      { $push: { visitHistory: { visitedAt: Date.now() } } },
    );
    return res.redirect(redirectUrl);
  } else {
    return res.status(404).json({ message: "resource not found!" });
  }
}

async function handleGetUrlAnalytics(req, res) {
  if (req.body.shortId) {
    const shortId = req.body.shortId;
    const urlEntry = await URL.findOne({ shortId: shortId });
    return res.json({ message: "success", urlEntry });
  } else {
    return res.status(400).json({ message: "bad request!" });
  }
}

module.exports = {
  handleCreateShortUrl,
  handleVistUrl,
  handleGetUrlAnalytics,
};
