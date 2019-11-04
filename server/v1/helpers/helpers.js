import jwt from 'jsonwebtoken';

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

  static genToken({ id, firstName, lastName }) {
    return jwt.sign({ id, firstName, lastName }, process.env.JWT_KEY);
  }
}

export default Helpers;
