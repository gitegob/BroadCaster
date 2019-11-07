import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';
import { users, records } from '../v1/data/data';

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
        res.body.data.record.should.have.all.keys(['id', 'createdOn', 'authorId', 'authorEmail', 'title', 'type', 'location', 'status', 'mediaUrl', 'comment']);
        records.find((rec) => `${rec.id}` === `${mockData.recordId}`).status = 'under investigation';
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
