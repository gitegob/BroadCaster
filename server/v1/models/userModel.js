import { users } from '../data/data';

const setId = (array) => {
  if (array.length < 1) return array.length + 1;
  return array[array.length - 1].id + 1;
};

class UserModel {
  constructor(firstName, lastName, email, password, userName, phone) {
    this.id = setId(users);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.phone = phone;
    this.isAdmin = false;
  }
}

export default UserModel;
