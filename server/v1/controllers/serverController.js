import Helpers from '../helpers/helpers';

const serverError = (req, res) => {
  const { status } = req.body;
  Helpers.serverError(status, 'Internal server error');
};
export default serverError;
