const mockData = {
  benSignup: {
    firstName: 'Ben',
    lastName: 'Gisa',
    email: 'bengisa@gmail.com',
    password: 'Password@123',
    userName: 'bengisa',
    phone: '+250785721391',
  },
  bruceSignup: {
    firstName: 'Bruce',
    lastName: 'Sangwa',
    email: 'bruceSangwa@gmail.com',
    password: 'Password@123',
    userName: 'brucesangwa',
    phone: '+250785721391',
  },
  benSignupInc: {
    firstName: 'Ben',
    email: 'bengisa@gmail.com',
    password: 'Password@123',
    userName: 'bengisa',
    phone: '+250785721391',
  },
  benSignupBad: {
    firstName: 'Ben',
    lastName: 'Gis  a',
    email: 'bengisa@gmail.com',
    password: 'Password@123',
    userName: 'bengisa',
    phone: '+250785721391',
  },
  benLogin: {
    email: 'bengisa@gmail.com',
    password: 'Password@123',
  },
  benLoginNotFound: {
    email: 'gisabena@gmail.com',
    password: 'Password@123',
  },
  benLoginIncPwd: {
    email: 'bengisa@gmail.com',
    password: 'Password@100',
  },
  benLoginBad: {
    email: 'bengisa  @gmail.com',
    password: 'Password@123',
  },
};

export default mockData;
