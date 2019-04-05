const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../keys/keys");

function genToken(id, email) {
  return new Promise(function(resolve, reject) {
    jwt.sign({ id, email }, keys.SECRET, function(err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

exports.postRegister = (req, res, next) => {
  // User object
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  try {
    // creating a hash from the given password
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        throw err;
      }
      bcrypt.hash(newUser.password, salt, null, async (err, hash) => {
        if (err) {
          throw err;
        }
        // set hashed password as the password field in newUser object.
        newUser.password = hash;

        // Save newUser
        const createdUser = new User(newUser);
        await createdUser.save();

        // Create jwt token and send
        const token = await genToken(createdUser._id, createdUser.email);
        res.status(201).json({
          message: "Success",
          token
        });
      });
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
