import { config } from 'dotenv';

config();

const mockData = {
  admin: {
    firstName: process.env.A_FNAME,
    lastName: process.env.A_LNAME,
    email: process.env.A_EMAIL,
    password: process.env.A_PASSWORD,
    userName: process.env.A_USERNAME,
    phone: process.env.A_PHONE,
  },
  benSignup: {
    firstName: 'Ben Fabregas',
    lastName: 'Gisa',
    email: 'gitegobtech@gmail.com',
    password: 'Password@123',
    userName: 'bengisa',
    phone: '+250785721391',
  },
  bruceSignup: {
    firstName: 'Bruce Johnson',
    lastName: 'Sangwa',
    email: 'bruceSangwa@gmail.com',
    password: 'Password@123',
    userName: 'brucesangwa',
    phone: '+250785721391',
  },
  benSignupInc: {
    firstName: 'Ben',
    email: 'gitegobtech@gmail.com',
    password: 'Password@123',
    userName: 'bengisa',
    phone: '+250785721391',
  },
  benSignupBad: {
    firstName: 'B',
    lastName: 'Gisa',
    email: 'gitegobtech@gmail.com',
    password: 'Password@123',
    userName: 'bengisa',
    phone: '+250785721391',
  },
  benLogin: {
    email: 'gitegobtech@gmail.com',
    password: 'Password@123',
  },
  adminLogin: {
    email: process.env.A_EMAIL,
    password: process.env.A_PASSWORD,
  },
  benLoginNotFound: {
    email: 'gisabena@gmail.com',
    password: 'Password@123',
  },
  benLoginIncPwd: {
    email: 'gitegobtech@gmail.com',
    password: 'Password@100',
  },
  benLoginBad: {
    email: 'bengisa  @gmail.com',
    password: 'Password@123',
  },
  newIntRecord: {
    title: 'Corruption   somewhere',
    type: 'intervention',
    location: '22.6789,11.56890',
    comment: 'There is   corruption in my neighborhood and it has got to stop',
  },
  newRecordEdited: {
    title: 'Corruption somewhere edited',
    type: 'intervention',
    location: '2.6789,1.56890',
    comment: 'There is corruption in my neighborhood and it has got to stop edited',
  },
  newRecordEditedWrong: {
    title: 'Corruption somewhere edited',
    type: 'foo',
    location: '2.6789,1.56890',
    comment: 'There is corruption in my neighborhood and it has got to stop edited',
  },
  newRedRecord: {
    title: 'Corruption somewhere',
    type: 'red-flag',
    location: '22.6789,11.56890',
    comment: 'There is corruption in my neighborhood and it has got to stop',
  },
  newRecordInc: {
    type: 'intervention',
    location: '22.6789,11.56890',
    comment: 'There is corruption in my neighborhood and it has got to stop',
  },
  invalidToken: 'eyhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiQmVuIiwibGFzdE5hbWUiOiJHaXNhIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU3Mjg4MzQ4MX0.WviyBGlvr1y0KNfcxwDwjtw8JwmJ8GCe6N5wk-OPSgk',
  nonExistToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiQmVuIiwibGFzdE5hbWUiOiJHaXNhIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU3Mjk1NjY3NH0.8Rt05JoON0ayCTtetWWelYh4q9sz-NLLZJOUEqJ79Ig',
};

export default mockData;
