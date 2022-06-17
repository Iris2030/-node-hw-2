const authService = require('../services/authService')


const registUser = async (req, res, next) => {
    try {
        const user = await authService.registUser(req.body)    

        res.status(201).json({
            email: user.email,
            subscription: user.subscription,
            role: user.role,
            id:user._id
        })

    } catch (error) {
next(error)
    }

}

const loginUser = async (req, res, next) => {
    try {
        const token = await authService.loginUser(req.body)   

 
return res.status(200).json(token) 

    } catch (error) {
        console.log(error);
next(error)
    }

}

const logoutUser = async (req, res, next) => {
// console.log(req.user._id);
    try {
await authService.logoutUser(req.user._id);
res.status(204).end();
    } catch (error) {
        console.log(error);
next(error)
    }

}

const updateSubscription = async (req,res,next)=>{
    const id = req.user._id
    const subscription = req.user.subscription
    if (subscription === undefined) {
        res.status(400).json({ message: "missing field subscription" });
      }
    try {
      const updatedSubscription = await authService.updateSubscription(id, req.body)
      res.status(200).json({
          email: updatedSubscription.email,
          subscription: updatedSubscription.subscription
      });
    } catch (error) {
       next(error) 
    }
}


module.exports = {
    registUser,loginUser,logoutUser,updateSubscription
}