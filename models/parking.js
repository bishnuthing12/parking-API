const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const parkSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      minlenght: [1, "cannot be less than 1 char"],
      maxlength: [100, "cannot have more than 100 char"],
    },
    plateNo: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },

    brandName: {
      type: String,
      required: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    makedYear: {
      type: Number,
      required: true,
    },
    parkingDataAndTime: {
      type: String,
      required: true,
    },

    parkingCharge: {
      type: String,
      required: true,
    },
    leaveDateAndTime: {
      type: String,
      required: [false, "can be update after received payment"],
    },
    parkedDuration: {
      type: String,
      required: [false, "can be update after parking timer checked"],
    },
    parkedPayment: {
      type: String,
      required: [false, "can be update after received payment"],
    },
  },
  { timestamps: true }
);

const Park = mongoose.model("Park", parkSchema);
module.exports = Park;
