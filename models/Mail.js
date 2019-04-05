const mongoose = require("mongoose");
const { Schema } = mongoose;

const mailSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  subject: {
    type: String
  },
  body: {
    type: String
  }
});

module.exports = mongoose.model("Mail", mailSchema);
