const User = require("../models/User");
const { verifyToken } = require("../helpers/token");

module.exports = async function(req, res, next) {
  try {
    const payload = verifyToken(req.headers.authorization);
    if (payload.error) {
      const error = new Error(payload.errorMessage);
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findById(payload.id);
    if (!user) {
      const error = new Error("User doesnt exist");
      error.statusCode = 404;
      throw error;
    }
    req.user = user;
    next();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
