import bcrypt from 'bcrypt';
import Helpers from '../helpers/helpers';
import { users } from '../data/data';
import User from '../models/userModel';

class UserController {
  static signup(req, res) {
    const { firstName, lastName, email, password, userName, phone } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User(firstName, lastName, email, hash, userName, phone);
    Helpers.sendSuccess(res, 201, 'User created successfully', {
      token: Helpers.genToken(newUser),
    });
    users.push(newUser);
  }
}

export default UserController;
