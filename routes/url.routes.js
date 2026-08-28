const express = require("express");
const {
  handleCreateShortUrl,
  handleVistUrl,
  handleGetUrlAnalytics,
} = require("../controllers/urls.controller");

const router = express.Router();

router.post("/", handleCreateShortUrl);
router.get("/:shortId", handleVistUrl);
router.post("/analytics", handleGetUrlAnalytics);

module.exports = router;
