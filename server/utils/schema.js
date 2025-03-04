import Joi from "joi";

const UserSchema = {
  register: Joi.object({
    name: Joi.string()
      .regex(/^[A-Za-z\s]+$/)
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "me", "org"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
  }),
  login: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "me", "org"] },
      })
      .required(),
    // phone: Joi.string().pattern(/^[0-9]{10}$/),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
  }),
  editUser: Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    name: Joi.string()
      .regex(/^[A-Za-z\s]+$/)
      .min(3)
      .max(30)
      .optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "me", "org"] },
      })
      .optional(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional(),
  }),
  userId: Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  params: {
    userId: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

export { UserSchema };
