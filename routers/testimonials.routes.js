const express = require("express");
const router = express.Router();
const db = require("./../db");
const utils = require("./../utils");

router
  .route("/testimonials")
  .get((req, res) => {
    res.json(db.testimonials);
  })
  .post((req, res) => {
    const { author, text } = req.body;
    if (author && text) {
      utils.pushID(db.testimonials, req.body);
      res.json({ message: "Success post" });
    } else {
      res.status(400).json({ message: "Error, can not push" });
    }
  });

router.route("/testimonials/random").get((req, res) => {
  res.json(utils.randomID(db.testimonials));
});

router
  .route("/testimonials/:id")
  .get((req, res) => {
    const response = utils.findID(db.testimonials, req.params.id);
    response ? res.json(response) : res.status(400).json(response);
  })
  .put((req, res) => {
    const id = req.params.id;
    const response = utils.modifyID(db.testimonials, id, req.body);
    response
      ? res.json({ response: `Success put` })
      : res
          .status(400)
          .json({ response: `Error, can't find item with id ${id}` });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const response = utils.deleteID(db.testimonials, id);
    response
      ? res.json({ message: `Success delete` })
      : res
          .status(400)
          .json({ message: `Error, can't find item with id ${id}` });
  });

module.exports = router;