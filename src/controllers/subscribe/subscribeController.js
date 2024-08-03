const { User } = require("../../models/User");
const emailSubscription = require("../../email/email");

const subscription = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!email) {
      return res.status(400).json({
        status: "Not found",
        code: 400,
        message: "Missing required field email",
      });
    }
    if (user && user.subscription === true) {
      return res.json({
        status: "Bad request",
        code: 404,
        message: "You are already subscribed to our newsletter",
      });
    }
    if (user && user.subscription === false) {
      await emailSubscription.sendEmail(email);
      user.subscription = true;
      await user.save();
      return res.json({
        status: "success",
        code: 200,
        message: "Subscription email sent",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  subscription,
};
