const express = require("express");
const mongoose = require("mongoose");
const { result } = require("lodash");
const parkingRouter = require("./routes/parkingRoutes");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

const dbUrl =
  "mongodb+srv://test:test@cluster0.joqgzcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbUrl)
  .then((result) => console.log("connected to db"))
  .catch((error) => {
    console.log(error);
  });

app.listen(2000);

app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.body);
  next();
});

app.use(express.json());
app.use(cors());
app.use("/parkings", parkingRouter);

app.use((req, res) => {
  res.status(404).send({ Message: "page not found" });
});
