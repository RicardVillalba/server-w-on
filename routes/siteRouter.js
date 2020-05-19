
const express = require("express");
const siteRouter = express.Router();
const createError = require("http-errors");

  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './image-recognition-277614-5dfb23593a56.json'
  });
   console.log("HOLA");
  // Performs label detection on the image file
  client
  .labelDetection('./routes/img.jpg')
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    //console.log(results);
  })
  .catch((err) => console.log(err));

 /* async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection('./routes/img.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  }

  quickstart();*/

  module.exports = siteRouter;


  



