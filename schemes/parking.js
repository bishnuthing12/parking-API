const ajvInstance = require("../middleweres/ajv");

const parkingSchema = {
  type: "object",
  properties: {
    category: { type: "string", minLength: 1, maxLength: 200 },

    plateNo: { type: "string" },
    makedYear: { type: "number" },
    color: { type: "string" },
    brandName: { type: "string", minLength: 1, maxLength: 200 },
    vehicleName: { type: "string", minLength: 1, maxLength: 200 },
    parkingDataAndTime: { type: "string" },
    parkingCharge: { type: "string" },
    leaveDateAndTime: { type: "string" },
    parkedDuration: { type: "string" },
    parkedPayment: { type: "string" },
  },
  required: [
    "category",
    "plateNo",
    "makedYear",
    "color",
    "brandName",
    "vehicleName",
    "parkingDataAndTime",
    "parkingCharge",
  ],
  additionalProperties: false,
};
const validateParking = ajvInstance.compile(parkingSchema);

module.exports = validateParking;
