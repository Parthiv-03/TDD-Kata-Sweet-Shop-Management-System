const Sweet = require("../models/Sweet");

exports.addSweet = async (req, res) => {
  const sweet = await Sweet.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(sweet);
};

exports.getAllSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(sweet);
};

exports.deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
};

exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(filter);
  res.json(sweets);
};
