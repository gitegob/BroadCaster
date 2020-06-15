import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('App tests', () => {
  it('should display a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Welcome to BroadCaster');
        done();
      });
  });
  it('should display a "Not Found" error ', (done) => {
    chai
      .request(app)
      .get('/blah')
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('Not Found');
        done();
      });
  });
  it('should display a server error message', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/error')
      .send({ status: 500 })
      .end((_err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(500);
        res.body.should.have.property('error').eql('SERVER DOWN!: Internal server error');
        done();
      });
  });
});
