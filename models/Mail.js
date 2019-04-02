const mongoose = require("mongoose");
const { Schema } = mongoose;

const mailSchema = new Schema({
  to: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  body: {
    type: String
  }
});

module.exports = mongoose.model("Mail", mailSchema);
