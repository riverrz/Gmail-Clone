const Mail = require("../models/Mail");

exports.getMail = async (req, res, next) => {
  const to = req.params.user;
  const mails = await Mail.find({ to });
  res.status(200).json({
    mails
  });
};

exports.postMail = async (req, res, next) => {
  const mailObj = {
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    body: req.body.body
  };
  try {
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
