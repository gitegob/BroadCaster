import schema from '../models/schema';
import Helpers from '../helpers/helpers';
import { users } from '../data/data';

class Middleware {
  static validateSignup(req, res, next) {
    const { firstName, lastName, email, password, userName, phone } = req.body;
    const { error } = schema.signupSchema.validate({
      firstName,
      lastName,
      email,
      password,
      userName,
      phone,
    });
    if (error) {
      Helpers.sendError(
        res,
        400,
        error.details[0].message.replace(/[/"]/g, ''),
      );
    } else next();
  }

  static checkSignup(req, res, next) {
    if (users.find((el) => el.email === req.body.email)) {
      Helpers.sendError(res, 409, 'Email already exists');
    } else next();
  }
}

export default Middleware;
