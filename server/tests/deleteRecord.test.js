import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';
import { users, records } from '../v1/data/data';

chai.use(chaiHttp);
chai.should();

describe('Deleting a record', () => {
  before('Sign up a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignup)
      .end((err, res) => {
        mockData.benToken = res.body.data.token;
        done();
      });
  });
  before('Create a new record', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newIntRecord)
      .end((err, res) => {
        mockData.recordId1 = res.body.data.record.id;
        done();
      });
  });
  before('Create another new record', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newIntRecord)
      .end((err, res) => {
        mockData.recordId2 = res.body.data.record.id;
        records.find((rec) => `${rec.id}` === `${mockData.recordId2}`).status = 'under investigation';
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

  it('user should delete their record', (done) => {
    chai.request(app)
      .delete(`/api/v1/records/${mockData.recordId1}`)
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Record deleted successfully');
        done();
      });
  });

  it('Should not delete a record which is under investigation', (done) => {
    chai.request(app)
      .delete(`/api/v1/records/${mockData.recordId2}`)
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Record cannot be deleted');
        done();
      });
  });

  it('Should not delete a non-existing record', (done) => {
    chai.request(app)
      .delete('/api/v1/records/1000')
      .set('token', mockData.benToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('Record not found');
        done();
      });
  });
});
