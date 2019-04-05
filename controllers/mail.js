const Mail = require("../models/Mail");
const User = require("../models/User");

exports.getMails = async (req, res, next) => {
  const to = req.params.user;
  const mails = await Mail.find({ to })
    .populate(["to", "from"].join(" "), "email")
    .exec();
  res.status(200).json({
    mails
  });
};

exports.getMail = async (req, res, next) => {
  const mailId = req.params.mailId;
  try {
    const mail = await Mail.findById(mailId)
      .populate(["to", "from"].join(" "), "email")
      .exec();
    res.json(mail);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.postMail = async (req, res, next) => {
  const to = req.body.to;
  const from = req.body.from;
  try {
    // Find if account present in 'to' field exists.
    const toUser = await User.findOne({ email: to });
    if (!toUser) {
      const err = new Error(
        "User account presented in 'to' field doesnt exist"
      );
      err.statusCode = 404;
      throw err;
    }
    // Find if account present in 'from' field exists
    const fromUser = await User.findOne({ email: from });
    if (!fromUser) {
      const err = new Error(
        "User account presented in 'from' field doesnt exist"
      );
      err.statusCode = 404;
      throw err;
    }
    // Creating mail object
    const mailObj = {
      subject: req.body.subject,
      body: req.body.body,
      to: toUser._id,
      from: fromUser._id
    };
    const mail = new Mail(mailObj);
    await mail.save();
    res.status(201).json({
      success: true
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
