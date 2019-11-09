import bcrypt from 'bcrypt';
import { users } from '../data/data';
import Helpers from '../helpers/helpers';

class UserModel {
  constructor(firstName, lastName, email, password, userName, phone) {
    this.id = Helpers.setId(users);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = bcrypt.hashSync(password, 10);
    this.userName = userName;
    this.phone = phone;
    this.isAdmin = false;
  }
}

export default UserModel;
