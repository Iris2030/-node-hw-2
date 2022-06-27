const User = require("../models/user");

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const findUser = async (filter) => {
  return User.findOne({ filter });
};

const findUserAndUpdate = async (filter, data) => {
  return await User.findOneAndUpdate(filter, data, { new: true });
};

module.exports = { updateUser, findUser, findUserAndUpdate };
