import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';
import { users } from '../v1/data/data';
import UserController from '../v1/controllers/userController';

chai.use(chaiHttp);
chai.should();

describe('Login tests', () => {
  before('create a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignup)
      .end((_err, res) => {
        done();
      });
  });

  after('delete a user', (done) => {
    users.splice(
      users.indexOf(users.find((el) => el.email === mockData.benSignup.email)),
      1,
    );
    done();
  });
  it('should log in a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.benLogin)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('message')
          .eql('User logged in successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('should not login a user with incomplete info', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({ password: 'Password@100' })
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('email is required');
        done();
      });
  });
  it('should not login an a user with bad info', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.benLoginBad)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not login a user with incorrect password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.benLoginIncPwd)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Incorrect password');
        done();
      });
  });
  it('should not login a non-existing user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.benLoginNotFound)
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('User doesn\'t exist');
        done();
      });
  });
});
