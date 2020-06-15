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
    const { email, password } = req.body;
    const { error } = schema.loginSchema.validate({
      email,
      password,
    });
    Helpers.checkJoiError(error, res, next);
  }

  static checkLogin(req, res, next) {
    const user = users.find((el) => el.email === req.body.email);
    if (!user) {
      Helpers.sendError(res, 404, "User doesn't exist");
    } else {
      const password = bcrypt.compareSync(req.body.password, user.password);
      if (!password) {
        Helpers.sendError(res, 401, 'Incorrect password');
      } else next();
    }
  }

  static async auth(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      return Helpers.sendError(res, 401, 'Please log in or signup first');
    }
    let decoded = {};
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      return Helpers.sendError(res, 401, 'Invalid token');
    }
    if (!users.find((el) => el.email === decoded.email)) {
      return Helpers.sendError(res, 401, 'Invalid token');
    }
    req.payload = decoded;
    next();
  }

  static adminAuth(req, res, next) {
    if (req.payload.isAdmin) next();
    else {
      Helpers.sendError(
        res,
        403,
        'This request requires Administrator privileges',
      );
    }
  }

  static validateRecord(req, res, next) {
    const {
      title, type, location, comment,
    } = req.body;
    const { error } = schema.recordSchema.validate({
      title,
      type,
      location,
      comment,
    });
    if (req.method === 'PATCH') {
      if (
        error
        && (error.details[0].type === 'string.pattern.base'
          || error.details[0].type === 'any.only')
      ) Helpers.checkJoiError(error, res, next);
      else next();
    } else Helpers.checkJoiError(error, res, next);
  }

  static validateParams(req, res, next) {
    const { recordID } = req.params;
    if (recordID && (isNaN(recordID) || Number(recordID) > 10000)) Helpers.sendError(res, 400, 'Invalid parameters');
    else next();
  }

  static validateStatus(req, res, next) {
    const { status } = req.body;
    const { error } = schema.statusSchema.validate({ status });
    Helpers.checkJoiError(error, res, next);
  }
}

export default Middleware;
