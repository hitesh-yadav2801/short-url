const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortId = shortid();

  const entry = await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
  // return res.status(201).json({ shortId: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  return res.status(200).json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
