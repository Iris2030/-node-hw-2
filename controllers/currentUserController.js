const getCurrent = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json("Not authorized");
    }
    res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
