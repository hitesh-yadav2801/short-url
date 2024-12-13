const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();


router.get('/admin/urls', restrictTo(["admin"]), async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
});

router.get("/", restrictTo(["user", "admin"]),async (req, res) => {
  //if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
