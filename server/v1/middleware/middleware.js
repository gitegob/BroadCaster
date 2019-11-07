import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    Helpers.checkJoiError(error, res, next);
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
    Helpers.checkJoiError(error, res, next);
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

  static auth(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      Helpers.sendError(res, 401, 'Please log in or signup first');
    } else {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      if (!users.find((el) => el.email === decoded.email)) {
        Helpers.sendError(res, 401, 'Invalid token');
      } else {
        req.payload = decoded;
        next();
      }
    }
  }

  static validateRecord(req, res, next) {
    const {
      title, type, location, comment,
    } = req.body;
    const { error } = schema.recordSchema.validate({
      title, type, location, comment,
    });
    Helpers.checkJoiError(error, res, next);
  }

  static validateUpdate(req, res, next) {
    const {
      title, type, location, comment,
    } = req.body;
    const { error } = schema.recordSchema.validate({
      title, type, location, comment,
    });
    if (error && error.details[0].type === 'string.pattern.base') Helpers.checkJoiError(error, res, next);
    else next();
  }


  static validateParams(req, res, next) {
    const { recordID } = req.params;
    if (recordID && (isNaN(recordID) || Number(recordID) > 10000)) Helpers.sendError(res, 400, 'Invalid parameters');
    else next();
  }
}

export default Middleware;
