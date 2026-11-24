const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/auth/signup", (req, res) => {
  return res.render("signup");
});

router.get("/auth/login", (req, res) => {
  return res.render("login");
});

router.get("/dashboard", (req, res) => {
  return res.render("dashboard");
});

module.exports = router;
