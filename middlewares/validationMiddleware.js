
const Joi = require("joi");

module.exports={
    validation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
              .min(3)
              .max(30)
              .required(),
            email: Joi.string().email({
              minDomainSegments: 2,
              tlds: { allow: true },
            }),
            phone: Joi.string()
              .max(15)
              .pattern( /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
              .required(),
          });
          const validationResult = schema.validate(req.body);
          if (validationResult.error) {
            return res.status(400).json({ status: validationResult.error.details });
          }
          next();
    }

}