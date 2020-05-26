const express = require("express");
const favoritesRouter = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Favorite = require("../models/favorite");

// HELPER FUNCTIONS
const { isLoggedIn } = require("../helpers/middlewares");

//GET/favorites/:id
favoritesRouter.get("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Favorite.findById(id)
    .then((favoriteObj) => {
      console.log(favoriteObj, favoriteObj);
      res.status(200).json(favoriteObj);
    })
    .catch((err) => next(createError(err)));
});
//POST/favorites/:id
favoritesRouter.post("/", isLoggedIn, (req, res, next) => {
  const { imageUrl, season } = req.body;
  const newFavorite = { imageUrl, season };

  Favorite.create(newFavorite)
    .then((favoriteObj) => {
      console.log(favoriteObj, favoriteObj);
      return User.findByIdAndUpdate(req.session.currentUser._id, { $push: { favorites: favoriteObj._id } }, {new:true});
    })
    .then((updatedUser) =>{
      req.session.currentUser = updatedUser;
      res.status(200).json(updatedUser)
    })
    .catch((err) => next(createError(err)));
});
//DELETE/favorites/:id
favoritesRouter.delete("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Favorite.findByIdAndRemove(id)
    .then(() => {
      return User.findByIdAndUpdate(
        req.session.currentUser._id,
        { $pull: { favorites: id } },
        { new: true }
      );
    })
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((err) => next(createError(err)));
});
module.exports = favoritesRouter;
