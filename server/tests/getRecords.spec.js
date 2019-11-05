import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';
import { users, records } from '../v1/data/data';

chai.use(chaiHttp);
chai.should();

describe('Fetching records', () => {
  before('Sign up a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignup)
      .end((err, res) => {
        mockData.benToken = res.body.data.token;
        done();
      });
  });
  before('Sign up another user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.bruceSignup)
      .end((err, res) => {
        mockData.bruceToken = res.body.data.token;
        done();
      });
  });
  before('create a new record', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newIntRecord)
      .end((err, res) => {
        mockData.recordId1 = res.body.data.record.id;
        done();
      });
  });
  before('create a new record', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newRedRecord)
      .end((err, res) => {
        done();
      });
  });
  before('create another record', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.bruceToken)
      .send(mockData.newRedRecord)
      .end((err, res) => {
        mockData.recordId2 = res.body.data.record.id;
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
  it('should fetch all records by a user', (done) => {
    chai.request(app)
      .get('/api/v1/records/all')
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Records fetched successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('records');
        res.body.data.records.should.be.a('Array');
        done();
      });
  });
  it('should fetch all red-flag records by a user', (done) => {
    chai.request(app)
      .get('/api/v1/records/red-flags')
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Records fetched successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('records');
        res.body.data.records.should.be.a('Array');
        done();
      });
  });
  it('should fetch all red-flag records by a user', (done) => {
    chai.request(app)
      .get('/api/v1/records/interventions')
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Records fetched successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('records');
        res.body.data.records.should.be.a('Array');
        done();
      });
  });
  it('should fetch a single record by a user', (done) => {
    chai.request(app)
      .get(`/api/v1/records/all/${mockData.recordId1}`)
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Record fetched successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('record');
        res.body.data.record.should.be.a('Object');
        done();
      });
  });
  it('should not fetch another user\'s record', (done) => {
    chai.request(app)
      .get(`/api/v1/records/all/${mockData.recordId2}`)
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('Record not found');
        done();
      });
  });
  it('should not fetch a non-existing record', (done) => {
    chai.request(app)
      .get('/api/v1/records/all/2344')
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('Record not found');
        done();
      });
  });
  it('should not fetch a record with invalid parameters', (done) => {
    chai.request(app)
      .get('/api/v1/records/all/2344657')
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('Invalid parameters');
        done();
      });
  });
});
