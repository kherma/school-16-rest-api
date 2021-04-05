const express = require("express");
const router = express.Router();
const {
  getAll,
  getRandom,
  getById,
  addNew,
  modifyOne,
  deleteOne,
} = require("../controllers/testimonials.controller");

router.route("/testimonials").get(getAll).post(addNew);
router.route("/testimonials/random").get(getRandom);
router.route("/testimonials/:id").get(getById).put(modifyOne).delete(deleteOne);

module.exports = router;
