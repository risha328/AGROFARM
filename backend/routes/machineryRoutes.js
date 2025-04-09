const express = require("express");
const router = express.Router();
const Machinery = require("../models/MachineryModel");

// @route   POST /api/machineries
// @desc    Upload machinery
router.post("/", async (req, res) => {
  try {
    const newMachinery = new Machinery(req.body);
    await newMachinery.save();
    res.status(201).json({ message: "Machinery uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error uploading machinery", error: err.message });
  }
});

// @route   GET /api/machineries
// @desc    Fetch all machineries
router.get("/", async (req, res) => {
  try {
    const allMachineries = await Machinery.find().sort({ createdAt: -1 });
    res.json(allMachineries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch machineries", error: err.message });
  }
});

// backend/routes/machineries.js
router.get('/:id', async (req, res) => {
  try {
    const machinery = await Machinery.findById(req.params.id);
    if (!machinery) {
      return res.status(404).json({ message: "Machinery not found" });
    }
    res.json(machinery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching machinery", error });
  }
});


module.exports = router;
