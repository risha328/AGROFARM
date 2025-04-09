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

router.put("/:id", async (req, res) => {
  try {
    const updated = await Machinery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE machinery
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Machinery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Machinery deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
