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
const {
  getByPerformer,
  getByGenre,
  getByPrice,
  getByDay,
} = require("../controllers/searchConcerts.controller");

router.route("/concerts").get(getAll).post(addNew);
router.route("/concerts/random").get(getRandom);
router.route("/concerts/:id").get(getById).put(modifyOne).delete(deleteOne);

// =============================
// SEARCH FOR SPECIFIC CONCERTS
// =============================

// :performer in format /name-surname e.g. /john-doe
router.route("/concerts/performer/:performer").get(getByPerformer);
router.route("/concerts/genre/:genre").get(getByGenre);
router.route("/concerts/price/:price_min/:price_max").get(getByPrice);
router.route("/concerts/day/:day").get(getByDay);

module.exports = router;
