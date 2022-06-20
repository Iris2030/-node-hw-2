const { createError } = require("../helpers/errors");
const { authenticateUser } = require("../services/authService");


const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      next(createError(401, "Not authorized"));
    }

    const user = await authenticateUser(token);
    console.log(user);

    if (!user || !user.token) {
      next(createError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const authorization = (subscription) => {
  return (req, res, next) => {
    if (req.user.subscription !== subscription) {
      next(createError(403, "Forbidden"));
    }
    next();
  };
};

module.exports = { auth, authorization };
