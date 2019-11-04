import { users } from '../data/data';

const setId = (array) =>
  array.length < 1 ? array.length + 1 : array[array.length - 1].id + 1;

class UserModel {
  constructor(firstName, lastName, email, password, userName, phone) {
    this.id = setId(users);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.phone = phone;
  }
}

export default UserModel;
