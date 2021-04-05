const Seat = require("../models/seat.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const random = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(random);
    seat ? res.json(seat) : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    seat ? res.json(seat) : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const isTaken = await Seat.find({ day: day, seat: seat });
    if (!isTaken.length) {
      const newSeat = new Seat({
        day: day,
        seat: seat,
        client: client,
        email: email,
      });
      await newSeat.save();
      await Seat.find({}, (err, seats) => {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          req.io.emit("seatsUpdated", seats);
        }
      });
    } else {
      res.status(406).json({ message: "Error, seat taken" });
    }
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.modifyOne = async (req, res) => {
  const { day, seat, client, email } = req.body;
  const setObject = {};
  if (day) setObject.day = day;
  if (seat) setObject.seat = seat;
  if (client) setObject.client = client;
  if (email) setObject.email = email;
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: setObject });
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
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
