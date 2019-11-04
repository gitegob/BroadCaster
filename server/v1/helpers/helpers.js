import jwt from 'jsonwebtoken';
import ServerError from '../models/errorModel';

class Helpers {
  static sendSuccess(res, status, message, data) {
    res.status(status).send({
      status,
      message,
      data,
    });
  }

  static sendError(res, status, error) {
    res.status(status).send({
      status,
      error,
    });
  }

  static checkJoiError(error, res, next) {
    if (error) {
      this.sendError(
        res,
        400,
        error.details[0].message.replace(/[/"]/g, ''),
      );
    } else next();
  }

  static genToken({
    id, firstName, lastName, isAdmin,
  }) {
    return jwt.sign({
      id, firstName, lastName, isAdmin,
    }, process.env.JWT_KEY);
  }

  static serverError(status) {
    throw new ServerError(status);
  }
}

export default Helpers;
