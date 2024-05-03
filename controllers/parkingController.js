const Parking = require("../models/parking");

const getParkings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search = "",
      sortField = "makedYear",
      sortOrder = "asc",
      category = "",
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const query = {};
    if (search) {
      query.category = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    const totalCount = await Parking.countDocuments(query);

    const parkings = await Parking.find(query)
      .sort({ [sortField]: sortOrder === "desc" ? -1 : 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const response = {
      parkings,
      totalPages: Math.ceil(totalCount / limitNumber),
      currentPage: pageNumber,
      totalItems: totalCount,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getParkingById = (req, res) => {
  const parkingId = req.params.id;
  Parking.findById(parkingId)
    .then((parking) => {
      if (!parking) {
        res.status(404).send({ message: "parking not found" });
      } else {
        res.send(parking);
      }
    })
    .catch((error) => {
      console.error("error while getting parking by id", error);
      res.status(500).send({ message: "error while getting parking by id" });
    });
};

const createParking = (req, res) => {
  const {
    category,
    plateNo,
    makedYear,
    color,
    brandName,
    vehicleName,
    parkingDataAndTime,
    parkingCharge,
    leaveDateAndTime,
    parkedDuration,
    parkedPayment,
  } = req.body;
  const parking = new Parking({
    category,
    plateNo,
    color,
    makedYear,
    brandName,
    vehicleName,
    parkingDataAndTime,
    parkingCharge,
    leaveDateAndTime,
    parkedDuration,
    parkedPayment,
  });
  parking
    .save()
    .then((result) => res.send(result))
    .catch((error) => res.status(400).send(error));
};

const updateParking = (req, res) => {
  const { id } = req.params;
  const {
    category,
    plateNo,
    makedYear,
    color,
    brandName,
    vehicleName,
    parkingDataAndTime,
    parkingCharge,
    leaveDateAndTime,
    parkedDuration,
    parkedPayment,
  } = req.body;
  Parking.findByIdAndUpdate(
    id,
    {
      category,
      plateNo,
      makedYear,
      color,
      brandName,
      vehicleName,
      parkingDataAndTime,
      parkingCharge,
      leaveDateAndTime,
      parkedDuration,
      parkedPayment,
    },
    { new: true }
  )
    .then((updatedParking) => {
      if (!updatedParking) {
        return res.status(404).send({ message: "parking not found" });
      }
      res.send(updatedParking);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "error updating parking" });
    });
};

const deleteParkingById = (req, res) => {
  const { id } = req.params;
  Parking.findByIdAndDelete(id)
    .then((deletedParking) => {
      if (!deletedParking) {
        return res.status(404).send({ message: "parking is not found" });
      }
      res.send({ message: "parking deleted successfully" });
    })
    .catch((error) => {
      console.log("error deleting parking", error);
      res.status(500).send({ message: "error while deleting parking" });
    });
};

module.exports = {
  createParking,
  getParkings,
  getParkingById,
  updateParking,
  deleteParkingById,
};
