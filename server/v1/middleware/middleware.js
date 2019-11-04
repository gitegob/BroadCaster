import bcrypt from 'bcrypt';
import schema from '../models/schema';
import Helpers from '../helpers/helpers';
import { users } from '../data/data';

class Middleware {
  static validateSignup(req, res, next) {
    const {
      firstName, lastName, email, password, userName, phone,
    } = req.body;
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

  static validateLogin(req, res, next) {
    const {
      email, password,
    } = req.body;
    const { error } = schema.loginSchema.validate({
      email,
      password,
    });
    if (error) {
      Helpers.sendError(
        res,
        400,
        error.details[0].message.replace(/[/"]/g, ''),
      );
    } else next();
  }

  static checkLogin(req, res, next) {
    const user = users.find((el) => el.email === req.body.email);
    if (!user) {
      Helpers.sendError(res, 404, 'User doesn\'t exist');
    } else {
      const password = bcrypt.compareSync(req.body.password, user.password);
      if (!password) {
        Helpers.sendError(res, 401, 'Incorrect password');
      } else next();
    }
  }
}

export default Middleware;
