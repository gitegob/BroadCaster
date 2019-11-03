import Joi from '@hapi/joi';

const schema = {
  signupSchema: Joi.object({
    firstName: Joi.string()
      .min(2)
      .trim()
      .regex(/^\S[A-Za-z]{1,}$/)
      .required(),
    lastName: Joi.string()
      .min(2)
      .trim()
      .regex(/^\S[A-Za-z]{1,}$/)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/)
      .required(),
    userName: Joi.string()
      .min(2)
      .trim()
      .regex(/^\S[A-Za-z]{1,}$/)
      .required(),
    phone: Joi.string()
      .min(8)
      .trim()
      .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/)
      .required(),
  }),
};

export default schema;
