const express = require("express");
const router = express.Router();
const {
  getAll,
  getRandom,
  getById,
  addNew,
  modifyOne,
  deleteOne,
} = require("../controllers/seats.controller");

router.route("/seats").get(getAll).post(addNew);
router.route("/seats/random").get(getRandom);
router.route("/seats/:id").get(getById).put(modifyOne).delete(deleteOne);

module.exports = router;
