const express = require("express");
const router = express.Router();
const Address = require("../models/Address");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      label,
      streetAddress,
      city,
      state,
      zipCode,
      isDefault
    } = req.body;

    if (!userId || !label || !streetAddress || !city || !state || !zipCode) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (isDefault) {
      await Address.updateMany(
        { userId },
        { $set: { isDefault: false } }
      );
    }

    const address = new Address({
      userId,
      label,
      streetAddress,
      city,
      state,
      zipCode,
      isDefault: isDefault || false
    });

    await address.save();

    res.status(201).json(address);

  } catch (error) {
    
    res.status(500).json({
      message: "Address save failed",
    
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(addresses);

  } catch (error) {
    console.log("Fetch Address Error:", error);

    res.status(500).json({
      message: "Addresses fetch failed"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);

    res.json({
      message: "Address deleted"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete failed"
    });
  }
});

router.put("/:id/default", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    await Address.updateMany(
      { userId: address.userId },
      { $set: { isDefault: false } }
    );

    address.isDefault = true;

    await address.save();

    res.json(address);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Default address update failed"
    });
  }
});

module.exports = router;