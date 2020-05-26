const express = require("express");
const userRouter = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
// HELPER FUNCTIONS
const { isLoggedIn } = require("../helpers/middlewares");

// GET         '/user/:id'
userRouter.get("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .populate("favorites")
    .then((userObj) => {
      console.log(userObj, userObj);
      res.status(200).json(userObj);
    })
    .catch((err) => next(createError(err)));
});
// PUT "USER/:id"

userRouter.put("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, tel } = req.body;
  const updatedUser = { username, email, password, tel };

  User.findByIdAndUpdate(id, updatedUser, { new: true })
    .then((userObj) => {
      console.log(userObj, userObj);
      res.status(200).json(userObj);
    })
    .catch((err) => next(createError(err)));
});

module.exports = userRouter;
