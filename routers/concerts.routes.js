const express = require("express");
const router = express.Router();
const {
  getAll,
  getRandom,
  getById,
  addNew,
  modifyOne,
  deleteOne,
} = require("../controllers/concerts.controller");

router.route("/concerts").get(getAll).post(addNew);
router.route("/concerts/random").get(getRandom);
router.route("/concerts/:id").get(getById).put(modifyOne).delete(deleteOne);

module.exports = router;
