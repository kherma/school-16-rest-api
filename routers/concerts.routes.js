const express = require("express");
const router = express.Router();
const Concert = require("../models/concert.model");

router
  .route("/concerts")
  .get(async (req, res) => {
    try {
      res.json(await Concert.find());
    } catch (err) {
      res.status(500).json({ message: err });
    }
  })
  .post(async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
      const newConcert = new Concert({
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
      });
      await newConcert.save();
      res.json({ message: "OK" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });

router.route("/concerts/random").get(async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const random = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(random);
    concert
      ? res.json(concert)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router
  .route("/concerts/:id")
  .get(async (req, res) => {
    try {
      const concert = await Concert.findById(req.params.id);
      concert
        ? res.json(concert)
        : res.status(404).json({ message: "Not found" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  })
  .put(async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const setObject = {};
    if (performer) setObject.performer = performer;
    if (genre) setObject.genre = genre;
    if (price) setObject.price = price;
    if (day) setObject.day = day;
    if (image) setObject.image = image;
    try {
      const concert = await Concert.findById(req.params.id);
      if (concert) {
        await Concert.updateOne({ _id: req.params.id }, { $set: setObject });
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
      const concert = await Concert.findById(req.params.id);
      if (concert) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: "OK" });
      } else {
        res.status(404).json({ message: "Not found..." });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });

module.exports = router;
