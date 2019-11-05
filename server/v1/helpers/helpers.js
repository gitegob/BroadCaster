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
    id, firstName, lastName, email, isAdmin,
  }) {
    return jwt.sign({
      id, firstName, lastName, email, isAdmin,
    }, process.env.JWT_KEY);
  }

  static serverError(status, message) {
    throw new ServerError(status, message);
  }


  static setId(array) {
    if (array.length < 1) return array.length + 1;
    return array[array.length - 1].id + 1;
  }
}

export default Helpers;
