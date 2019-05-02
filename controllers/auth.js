const bcrypt = require("bcrypt-nodejs");
// const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const keys = require("../keys/keys");

const { genToken } = require("../helpers/token");

exports.postRegister = async (req, res, next) => {
  // User object
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  // Check if user exists
  try {
    const user = await User.findOne({
      $or: [{ email: newUser.email }, { username: newUser.username }]
    });
    if (user) {
      const error = new Error("Email/Username already taken.");
      error.statusCode = 422;
      throw error;
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
        const token = await genToken(createdUser._id, createdUser.email);
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
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid Email/Password");
      error.statusCode = 404;
      return next(error);
    }
    bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) {
        return next(err);
      }
      if (!isMatch) {
        const error = new Error("Invalid Email/Password");
        error.statusCode = 404;
        return next(error);
      }
      const token = await genToken(user._id, user.email);
      res.status(200).json({
        success: true,
        token
      });
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

exports.getCurrentUser = (req, res, next) => {
  res.json({
    username: req.user.username,
    email: req.user.email,
    id: req.user._id
  });
};
