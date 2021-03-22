const express = require("express");
const router = express.Router();
const db = require("./../db");
const utils = require("./../utils");

// ID generator
function* idGenerator() {
  let id = db.concerts.length + 1;
  while (true) {
    yield id;
    id++;
  }
}
const generator = idGenerator();

router
  .route("/concerts")
  .get((req, res) => {
    res.json(db.concerts);
  })
  .post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    if (performer && genre && price && day && image) {
      utils.pushID(db.concerts, req.body);
      res.json({ message: "Success post" });
    } else {
      res.status(400).json({ message: "Error, can not push" });
    }
  });

router.route("/concerts/random").get((req, res) => {
  res.json(utils.randomID(db.concerts));
});

router
  .route("/concerts/:id")
  .get((req, res) => {
    const response = utils.findID(db.concerts, req.params.id);
    response ? res.json(response) : res.status(400).json(response);
  })
  .put((req, res) => {
    const id = req.params.id;
    const response = utils.modifyID(db.concerts, id, req.body);
    response
      ? res.json({ response: `Success put` })
      : res
          .status(400)
          .json({ response: `Error, can't find item with id ${id}` });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const response = utils.deleteID(db.concerts, id);
    response
      ? res.json({ message: `Success delete` })
      : res
          .status(400)
          .json({ message: `Error, can't find item with id ${id}` });
  });

module.exports = router;
