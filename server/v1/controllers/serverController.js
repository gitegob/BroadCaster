import ServerError from '../models/errorModel';

const serverError = (req, res) => {
  throw new ServerError(req.body.status);
};
export default serverError;
