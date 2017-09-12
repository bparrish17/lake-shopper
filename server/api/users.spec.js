/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const agent = request.agent(app);

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) //end describe('/api/users/)
   
  describe('GET api/users/:id', () => {

    //create fake user emails

    var emailTest;

    beforeEach(function () {
      
      var createEmail = [
    {email: 'emailTest@email.com'},
    {email: 'anotherEmail@email.com'},
    {email: 'thirdEmail@email.com'}
    ]
    .map(data => User.create(data));

    return Promise.all(createEmail)
    .then(createdEmail => {
      emailTest = createdEmail[1]
    });

    //test if route properly gets the id

    it('returns the JSON of the article based on the id', function () {

      return agent
      .get('api/users/' + emailTest.id)
      .expect(200)
      .expect(function (res) {
        if(typeof res.body === 'string') {
          res.body = JSON.parse(res.body);
        }
        expect(res.body.email).to.equal('anotherEmail@email.com')
      });
    });
    });

    //test if route will give a 404 with an incorrect id

    it('returns a 404 error if the ID is not correct', function () {
      return agent
      .get('api/users/37463')
      .expect(404);
    })

  });// end describe('/api/users/:id')

    //got to revisit this test!!!
    
  describe('POST api/users', function () {
    it('creates a new user', function () {
      return agent
      .post('/users')
      .send({
        email: 'sentEmail@email.com',
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.email).to.equal('sentEmail@email.com');
      })
    })
  })

}); // end describe('User routes')
