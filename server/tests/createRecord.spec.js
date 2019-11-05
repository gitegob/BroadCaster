import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

describe('Creating a record', () => {
  before('Sign up an employee', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.benSignup)
      .end((err, res) => {
        mockData.benToken = res.body.data.token;
        done();
      });
  });

  it('should create a new record with image', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('Content-Type', 'multipart/form-data')
      .set('token', mockData.benToken)
      .field(mockData.newRecord)
      .attach('media',
        fs.readFileSync('/home/gbrian/Desktop/Andela/ADC 13/BroadCaster/UI/images/kevin.jpg'),
        'kevin.jpg')
      .end((err, res) => {
        res.should.have.status(201);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('Record created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('record');
        res.body.data.record.should.have.all.keys(['id', 'createdOn', 'authorId', 'title', 'type', 'location', 'status', 'mediaUrl', 'comment']);
        done();
      });
  });

  it('should not save an invalid file', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('Content-Type', 'multipart/form-data')
      .set('token', mockData.benToken)
      .field(mockData.newRecord)
      .attach('media',
        fs.readFileSync('/home/gbrian/Desktop/Andela/ADC 13/BroadCaster/UI/pages/contact.html'),
        'kevin.jpg')
      .end((err, res) => {
        res.should.have.status(201);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('Record created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('record');
        res.body.data.record.should.have.all.keys(['id', 'createdOn', 'authorId', 'title', 'type', 'location', 'status', 'mediaUrl', 'comment']);
        done();
      });
  });

  it('should create a new record with no image', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.benToken)
      .send(mockData.newRecord)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('Record created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('record');
        res.body.data.record.should.have.all.keys(['id', 'createdOn', 'authorId', 'title', 'type', 'location', 'status', 'mediaUrl', 'comment']);
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
      .send(mockData.newRecordInc)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Please log in or signup first');
        done();
      });
  });
  it('Should not create a record with an invalid token', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.invalidToken)
      .send(mockData.newRecord)
      .end((err, res) => {
        res.should.have.status(500);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(500);
        res.body.should.have.property('error').eql('SERVER DOWN!: invalid token');
        done();
      });
  });
  it('Should not create a record with a non existing user\'s token', (done) => {
    chai.request(app)
      .post('/api/v1/records')
      .set('token', mockData.nonExistToken)
      .send(mockData.newRecord)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.have.property('body');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Invalid token');
        done();
      });
  });
});
