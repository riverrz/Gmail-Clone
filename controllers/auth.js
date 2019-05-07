const bcrypt = require("bcrypt-nodejs");
// const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const keys = require("../keys/keys");

const { genToken } = require("../helpers/token");

exports.postRegister = async (req, res, next) => {
  // User object
  const newUser = {
    username: req.body.username,
    password: req.body.password
  };
  // Check if user exists
  try {
    const user = await User.findOne({ username: newUser.username });
    if (user) {
      const error = new Error("Username already taken.");
      error.statusCode = 422;
      return next(error);
    }
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }

  // creating a hash from the given password
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(newUser.password, salt, null, async (err, hash) => {
      if (err) {
        return next(err);
      }
      try {
        // set hashed password as the password field in newUser object.
        newUser.password = hash;

        // Save newUser
        const createdUser = new User(newUser);
        await createdUser.save();

        // Create jwt token and send
        const token = await genToken(createdUser._id, createdUser.username);
        res.status(201).json({
          success: true,
          token
        });
      } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
      }
    });
  });
};

exports.postLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error("Invalid Username/Password");
      error.statusCode = 404;
      return next(error);
    }
    bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) {
        return next(err);
      }
      if (!isMatch) {
        const error = new Error("Invalid Username/Password");
        error.statusCode = 404;
        return next(error);
      }
      const token = await genToken(user._id, user.username);
      res.status(200).json({
        success: true,
        token
      });
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.getCurrentUser = (req, res, next) => {
  res.json({
    username: req.user.username,
    id: req.user._id
  });
};
