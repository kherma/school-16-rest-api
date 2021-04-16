const Testimonial = require("../models/testimonial.model");
const sanitize = require("mongo-sanitize");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const random = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(random);
    testimonial
      ? res.json(testimonial)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    testimonial
      ? res.json(testimonial)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  const { author, text } = sanitize(req.body);
  try {
    const newTestimonial = new Testimonial({
      author: author,
      text: text,
    });
    await newTestimonial.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.modifyOne = async (req, res) => {
  const { author, text } = req.body;
  const setObject = {};
  if (author) setObject.author = author;
  if (text) setObject.text = text;
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: setObject });
      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
