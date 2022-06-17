const User = require("../models/user");
const { createError } = require("../errors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const registUser = async (userData) => {
  const result = await User.findOne({ email: userData.email });

  if (result) {
    throw createError(409, "Email in use");
  }

  const password = userData.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ ...userData, password: hashedPassword });

  return user;
};

const SECRET_KEY = process.env.SECRET_KEY


const loginUser = async ({ email, password }) => {

        const user = await User.findOne({ email });

        if (!user) {
          throw createError(401, "Email or password is wrong");
        }
      
        const isValid = bcrypt.compareSync(password, user.password);
       
      
        if (!isValid) {
          throw createError(401, "Email or password is wrong");
        }
      
        const payload = {
          id: user._id,
          subscription: user.subscription,
        };
      
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2d'})
      await User.findByIdAndUpdate(user._id, {token})
        return token


};


const authenticateUser = async (token) =>{
try {
    const payload = jwt.verify(token, SECRET_KEY)
    const {id} = payload;
   return await User.findById(id)
} catch (error) {
    console.log(error);
    return null
}
}



const logoutUser = async (id) => {
await User.findByIdAndUpdate(id, {token : null})
};



const updateSubscription = async(id, subscription)=>{
return await User.findByIdAndUpdate(
    id,
    subscription,
    { new: true }
);
}

module.exports = {
  registUser,
  loginUser,
  authenticateUser,
  logoutUser,
  updateSubscription
};
