import UserModel from './userModel';

class Admin extends UserModel {
  constructor(firstName, lastName, email, password, userName, phone) {
    super(firstName, lastName, email, password, userName, phone);
    this.isAdmin = true;
  }
}

export default Admin;
