console.log("🔥 DASHBOARD ROUTE LOADED");

const express = require("express");
const router = express.Router();

// ================= STORAGE =================
let messMenu = {
  breakfast: [],
  lunch: [],
  snacks: [],
  dinner: []
};

let messStatus = {
  breakfast: "taken",
  lunch: "available",
  snacks: "not-started",
  dinner: "upcoming"
};

let messNotices = [];

// ================= GET =================

// MENU
router.get("/mess/menu", (req, res) => {
  res.json(messMenu);
});

// STATUS
router.get("/mess/status", (req, res) => {
  res.json(messStatus);
});

// NOTICES
router.get("/mess/notices", (req, res) => {
  res.json(messNotices);
});

// ================= POST =================

// ADD MENU ITEM
router.post("/mess/menu", (req, res) => {
  const { type, value } = req.body;

  if (!type || !value) {
    return res.status(400).json({ message: "Missing ❌" });
  }

  messMenu[type].push(value);
  res.json({ message: "Added ✅" });
});

// DELETE MENU
router.delete("/mess/menu", (req, res) => {
  const { type, index } = req.body;

  messMenu[type].splice(index, 1);
  res.json({ message: "Deleted ✅" });
});

// UPDATE STATUS
router.post("/mess/status", (req, res) => {
  messStatus = req.body;
  res.json({ message: "Updated ✅" });
});

// ADD NOTICE
router.post("/mess/notices", (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: "Empty ❌" });

  messNotices.push(text);
  res.json({ message: "Added ✅" });
});

// DELETE NOTICE
router.delete("/mess/notices/:index", (req, res) => {
  messNotices.splice(req.params.index, 1);
  res.json({ message: "Deleted ✅" });
});

module.exports = router;