const mongoose = require("mongoose");
const { Schema } = mongoose;

const mailSchema = new Schema(
  {
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
  },
  {
    timestamps: true
  }
);

mailSchema.methods.isReceiver = function(userId) {
  return this.receiver._id.toString() === userId.toString();
};

module.exports = mongoose.model("Mail", mailSchema);
