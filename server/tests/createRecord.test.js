import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';
import { users, records } from '../v1/data/data';

chai.use(chaiHttp);
chai.should();

describe('Creating a record', () => {
  before('Sign up a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignup)
      .end((err, res) => {
        mockData.benToken = res.body.data.token;
        done();
      });
  });
  after('delete users', (done) => {
    users.length = 0;
    done();
  });
  after('delete records', (done) => {
    records.length = 0;

    done();
  });

  it('should create a new record', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newIntRecord)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('Record created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('record');
        res.body.data.record.should.have.all.keys(['id', 'createdOn', 'authorId', 'authorName', 'title', 'type', 'location', 'status', 'media', 'comment']);
        done();
      });
  });

  it('Should not create a record with incomplete entries', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newRecordInc)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('title is required');
        done();
      });
  });
  it('Should not create a record if not logged in or signed up', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .send(mockData.newIntRecord)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Please log in or signup first');
        done();
      });
  });
  it('Should not create a record with a non existing user\'s token', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.nonExistToken)
      .send(mockData.newIntRecord)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Invalid token');
        done();
      });
  });
});
