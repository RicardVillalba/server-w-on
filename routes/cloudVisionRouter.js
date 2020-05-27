const express = require("express");
const cloudVisionRouter = express.Router();
const createError = require("http-errors");

//Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
//const customSearch = google.customsearch('v1');

cloudVisionRouter.post("/", (req, res, next) => {
  const imageUrl = req.body.imageUrl;
  //vision
  // Creates a client

  const client = new vision.ImageAnnotatorClient({
    keyFilename: ".gcpconfig.json",
  });

  // Performs label detection on the image file
  client
    .labelDetection(imageUrl)
    .then((results) => {
      const labels = results[0].labelAnnotations;

      console.log("Labels:");

      res.json(labels);
      //console.log(results);
    })
    .catch((err) => console.log(err));
});

module.exports = cloudVisionRouter;
