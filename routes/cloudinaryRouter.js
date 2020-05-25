  
const express = require('express');
const cloudinaryRouter = express.Router();
const mongoose = require('mongoose');
const parser = require("../config/cloudinary");


cloudinaryRouter.post('/', parser.single('image'), (req,res,next)=> {  
  console.log("inside cloudinary upload route");
  const image_url = req.file.secure_url;
  res.status(201).json(image_url);
})

module.exports = cloudinaryRouter;