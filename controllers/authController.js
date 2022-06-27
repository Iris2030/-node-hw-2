const { createError } = require("../helpers/errors");
const authService = require("../services/authService");
const { sendEmail } = require("../services/emailService");
const { findUserAndUpdate } = require("../services/userService");
const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    const user = await authService.registUser(req.body);

    await sendEmail(user.email, user.verificationToken);
    return res.status(201).json({
      code: 201,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);

    return res.status(200).json({
      code: 200,
      data: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user._id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  const id = req.user._id;
  const subscription = req.user.subscription;
  if (subscription === undefined) {
    res.status(400).json({ message: "missing field subscription" });
  }
  try {
    const updatedSubscription = await authService.updateSubscription(
      id,
      req.body
    );
    res.status(200).json({
      email: updatedSubscription.email,
      subscription: updatedSubscription.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const confirm = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await findUserAndUpdate(
      { verificationToken: verificationToken },
      { verify: true, verificationToken: null }
    );

    if (!user) {
      throw createError(404, "User not found");
    }

    return res.status(200).json("Verification successful");
  } catch (error) {
    next(error);
  }
};

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createError(400, "missing required field email");
    }
    const user = await User.findOne({ email });
    // const user = await findUser(email)
    if (!user) {
      throw createError(404, "User was not found");
    }
    
    if(user.verify){
      throw createError(400,"Verification has already been passed")
    }

    await sendEmail(user.email, user.verificationToken);

    return res.status(200).json("Verification email sent");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  updateSubscription,
  confirm,
  resendEmail,
};
