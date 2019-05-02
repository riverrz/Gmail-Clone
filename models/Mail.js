const mongoose = require("mongoose");
const { Schema } = mongoose;

const mailSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  receiver: {
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
