const express = require("express");
const router = express.Router();
const parkingController = require("../controllers/parkingController");
const validate = require("../middleweres/validation");
const parkingSchema = require("../schemes/parking");
const { sortBy } = require("lodash");

router.get("/", parkingController.getParkings);
router.get("/:id", parkingController.getParkingById);
router.post("/", validate(parkingSchema), parkingController.createParking);
router.put("/:id", parkingController.updateParking);
router.delete("/:id", parkingController.deleteParkingById);

module.exports = router;
