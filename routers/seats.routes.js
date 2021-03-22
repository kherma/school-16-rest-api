const express = require("express");
const router = express.Router();
const db = require("./../db");
const utils = require("./../utils");

// ID generator
function* idGenerator() {
  let id = db.seats.length + 1;
  while (true) {
    yield id;
    id++;
  }
}
const generator = idGenerator();

router
  .route("/seats")
  .get((req, res) => {
    res.json(db.seats);
  })
  .post((req, res) => {
    const { day, seat, client, email } = req.body;
    if (day && seat && client && email) {
      utils.pushID(db.seats, req.body);
      res.json({ message: "Success post" });
    } else {
      res.status(400).json({ message: "Error, can not push" });
    }
  });

router.route("/seats/random").get((req, res) => {
  res.json(utils.randomID(db.seats));
});

router
  .route("/seats/:id")
  .get((req, res) => {
    const response = utils.findID(db.seats, req.params.id);
    response ? res.json(response) : res.status(400).json(response);
  })
  .put((req, res) => {
    const id = req.params.id;
    const response = utils.modifyID(db.seats, id, req.body);
    response
      ? res.json({ response: `Success put` })
      : res
          .status(400)
          .json({ response: `Error, can't find item with id ${id}` });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const response = utils.deleteID(db.seats, id);
    response
      ? res.json({ message: `Success delete` })
      : res
          .status(400)
          .json({ message: `Error, can't find item with id ${id}` });
  });

module.exports = router;
