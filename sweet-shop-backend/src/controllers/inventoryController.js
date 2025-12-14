const Sweet = require("../models/Sweet");
const InventoryLog = require("../models/InventoryLog");

exports.purchaseSweet = async (req, res) => {
  const { quantity } = req.body;

  const sweet = await Sweet.findById(req.params.id);
  if (sweet.quantity < quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  sweet.quantity -= quantity;
  await sweet.save();

  await InventoryLog.create({
    sweetId: sweet._id,
    action: "PURCHASE",
    quantity,
    performedBy: req.user.id
  });

  res.json({ message: "Purchase successful" });
};

exports.restockSweet = async (req, res) => {
  const { quantity } = req.body;

  const sweet = await Sweet.findById(req.params.id);
  sweet.quantity += quantity;
  await sweet.save();

  await InventoryLog.create({
    sweetId: sweet._id,
    action: "RESTOCK",
    quantity,
    performedBy: req.user.id
  });

  res.json({ message: "Restocked successfully" });
};
