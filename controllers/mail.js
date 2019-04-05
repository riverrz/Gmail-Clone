const Mail = require("../models/Mail");

exports.getMails = async (req, res, next) => {
  const to = req.params.user;
  const mails = await Mail.find({ to });
  res.status(200).json({
    mails
  });
};

exports.getMail = async (req, res, next) => {
  const mailId = req.params.mailId;
  try {
    const mail = await Mail.findById(mailId);
    res.json(mail);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
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
