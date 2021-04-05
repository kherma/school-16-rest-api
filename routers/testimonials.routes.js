const express = require("express");
const router = express.Router();
const Testimonial = require("../models/testimonial.model");

router
  .route("/testimonials")
  .get(async (req, res) => {
    try {
      res.json(await Testimonial.find());
    } catch (err) {
      res.status(500).json({ message: err });
    }
  })
  .post(async (req, res) => {
    const { author, text } = req.body;
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
  });

router.route("/testimonials/random").get(async (req, res) => {
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
});

router
  .route("/testimonials/:id")
  .get(async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      testimonial
        ? res.json(testimonial)
        : res.status(404).json({ message: "Not found" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  })
  .put(async (req, res) => {
    const { author, text } = req.body;
    const setObject = {};
    if (author) setObject.author = author;
    if (text) setObject.text = text;
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (testimonial) {
        await Testimonial.updateOne(
          { _id: req.params.id },
          { $set: setObject }
        );
        res.json({ message: "OK" });
      } else {
        res.status(404).json({ message: "Not found..." });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  })
  .delete(async (req, res) => {
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
  });

module.exports = router;
