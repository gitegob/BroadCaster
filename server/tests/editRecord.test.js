import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';
import { users, records } from '../v1/data/data';
import Admin from '../v1/models/adminModel';

chai.use(chaiHttp);
chai.should();

describe('Editing a record', () => {
  before('Sign up a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignup)
      .end((err, res) => {
        mockData.benToken = res.body.data.token;
        done();
      });
  });
  before('Create the admin', (done) => {
    const {
      firstName, lastName, email, password, userName, phone,
    } = mockData.admin;
    const admin = new Admin(firstName, lastName, email, password, userName, phone);
    users.push(admin);
    done();
  });
  before('Log in the admin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.adminLogin)
      .end((err, res) => {
        mockData.adminToken = res.body.data.token;
        done();
      });
  });
  before('Create a new record', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newIntRecord)
      .end((err, res) => {
        mockData.recordId = res.body.data.record.id;
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

  it('user should edit their record', (done) => {
    chai.request(app)
      .patch(`/api/v1/records/${mockData.recordId}`)
      .set('token', mockData.benToken)
      .send(mockData.newRecordEdited)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Record edited successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('record');
        res.body.data.record.should.have.all.keys(['id', 'createdOn', 'authorId', 'authorName', 'title', 'type', 'location', 'status', 'media', 'comment']);
        done();
      });
  });

  it('user should not edit their record with invalid info', (done) => {
    chai.request(app)
      .patch(`/api/v1/records/${mockData.recordId}`)
      .set('token', mockData.benToken)
      .send(mockData.newRecordEditedWrong)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('type must be one of [red-flag, intervention]');
        done();
      });
  });
  it('Admin should change the status of a record', (done) => {
    chai.request(app)
      .patch(`/api/v1/records/${mockData.recordId}/status`)
      .set('token', mockData.adminToken)
      .send({ status: 'under investigation' })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Record status updated successfully');
        done();
      });
  });
  it('Admin should not change the status of a non-existing record', (done) => {
    chai.request(app)
      .patch('/api/v1/records/1223/status')
      .set('token', mockData.adminToken)
      .send({ status: 'under investigation' })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('Record not found');
        done();
      });
  });
  it('Non-Admin should not change the status of a record', (done) => {
    chai.request(app)
      .patch(`/api/v1/records/${mockData.recordId}/status`)
      .set('token', mockData.benToken)
      .send({ status: 'under investigation' })
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('This request requires Administrator privileges');
        done();
      });
  });
  it('Should not edit a record which is under investigation', (done) => {
    chai.request(app)
      .patch(`/api/v1/records/${mockData.recordId}`)
      .set('token', mockData.benToken)
      .send(mockData.newRecordEdited)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Record cannot be edited');
        done();
      });
  });
});
