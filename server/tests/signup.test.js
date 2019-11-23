import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';
import { users } from '../v1/data/data';

chai.use(chaiHttp);
chai.should();

describe('Signup tests', () => {
  after('delete users', (done) => {
    users.length = 0;
    done();
  });
  it('should signup a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignup)
      .end((_err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have
          .property('message')
          .eql('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('should signup another user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.bruceSignup)
      .end((_err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have
          .property('message')
          .eql('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('should not signup a user with incomplete info', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignupInc)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastName is required');
        done();
      });
  });
  it('should not signup an a user with bad info', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignupBad)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not signup an an already existing user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignup)
      .end((_err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error').eql('Email already exists');
        done();
      });
  });
});
