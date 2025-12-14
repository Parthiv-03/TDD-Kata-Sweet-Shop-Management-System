const mongoose = require("mongoose");

const inventoryLogSchema = new mongoose.Schema({
  sweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sweet",
    required: true
  },
  action: {
    type: String,
    enum: ["PURCHASE", "RESTOCK"],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  performedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("InventoryLog", inventoryLogSchema);
