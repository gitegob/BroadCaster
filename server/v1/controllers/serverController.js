import Helpers from '../helpers/helpers';

const serverError = (req, res) => {
  const { status } = req.body;
  if (status === 400) { Helpers.serverError(status, 'Syntax error in your input'); } else Helpers.serverError(status, 'Internal server error');
};
export default serverError;
