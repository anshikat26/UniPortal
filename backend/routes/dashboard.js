const express = require("express");
const router = express.Router();

// TEMP DATA
let links = [];
let news = [];
let dates = [];

// TEST
router.get("/test", (req, res) => {
  res.send("Dashboard route working ✅");
});

// GET
router.get("/links", (req, res) => {
  console.log("GET LINKS HIT");
  res.json(links);
});

router.get("/news", (req, res) => {
  res.json(news);
});

router.get("/dates", (req, res) => {
  res.json(dates);
});

// POST LINKS
router.post("/links", (req, res) => {
  console.log("POST /links HIT");

  try {
    console.log("BODY:", req.body);

    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ message: "Value missing ❌" });
    }

    links.push(value);

    console.log("SAVED LINKS:", links);

    res.json({ message: "Link added ✅" });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// POST NEWS
router.post("/news", (req, res) => {
  try {
    const { value } = req.body;
    news.push(value);
    res.json({ message: "News added ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

// POST DATES
router.post("/dates", (req, res) => {
  try {
    const { value } = req.body;
    dates.push(value);
    res.json({ message: "Date added ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

module.exports = router;