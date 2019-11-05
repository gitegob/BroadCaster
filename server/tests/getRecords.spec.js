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
  before('create a new record', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newIntRecord)
      .end((err, res) => {
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
  after('delete users', (done) => {
    users.length = 0;
    done();
  });
  after('delete records', (done) => {
    records.length = 0;
    console.log(users, records);
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
});
