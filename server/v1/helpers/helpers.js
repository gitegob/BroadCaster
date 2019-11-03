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
}

export default Helpers;
