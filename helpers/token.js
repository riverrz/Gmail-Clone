const jwt = require("jsonwebtoken");
const keys = require("../keys/keys");

exports.genToken = function(id, email) {
  return new Promise(function(resolve, reject) {
    jwt.sign({ id, email }, keys.SECRET, function(err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

exports.verifyToken = function(token) {
  try {
    return jwt.verify(token, keys.SECRET);
  } catch (error) {
    return {error: true, errorMessage: error.message};
  }
};
