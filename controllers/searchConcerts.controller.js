const Concert = require("../models/concert.model");

exports.getByPerformer = async (req, res) => {
  try {
    const preformer = req.params.performer
      .split("-")
      .map((name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      })
      .join(" ");
    const data = await Concert.find({ performer: preformer });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const data = await Concert.find({ genre: genre });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const min = Number(req.params.price_min);
    const max = Number(req.params.price_max);
    const data = await Concert.find({ price: { $gte: min, $lte: max } });
    !min > max
      ? res.status(200).json(data)
      : res.status(404).json({ message: "error" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const day = Number(req.params.day);
    const data = await Concert.find({ day: day });
    data.length
      ? res.status(200).json(data)
      : res.status(404).json({ message: "error" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
