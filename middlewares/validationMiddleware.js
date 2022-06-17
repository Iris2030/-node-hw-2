const Joi = require("joi");


const createValidation = (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
              .min(3)
              .max(30)
              .required(),
            email: Joi.string().email({
              minDomainSegments: 2,
              tlds: { allow: true }
            }).required(),
            phone: Joi.string()
              .max(15)
              .pattern( /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
              .required(),
              favorite: Joi.bool(),
          });
          const {error} = schema.validate(req.body);
          if (error) {
            return res.status(400).json({ status: error.details });
          }
          next();
    }

    const patchValidation = (req, res, next) => {
      const schema = Joi.object({
            favorite: Joi.bool()
            .required(),
        });
        const {error} = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ status: error.details });
        }
        next();
  }

  const userValidation = (req, res, next) => {
    const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: true }
    }).required(),
    password: Joi.string()
    .min(8)
      .max(15)
      .required(),
      subscription: Joi.string(),
      });
      const {error} = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ status: error.details });
      }
      next();
}

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: true }
  }).required(),
  password: Joi.string()
  .min(8)
    .max(15)
    .required(),
    subscription: Joi.string()
    });
    const {error} = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: error.details });
    }
    next();
}

const subscriptionValidation = (req, res, next) => {
  const schema = Joi.object({
        subscription: Joi.string()
        .required(),
    });
    const {error} = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: error.details });
    }
    next();
}

  module.exports = {createValidation, patchValidation,userValidation,loginValidation,subscriptionValidation}