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
    
    //user goes to their my profile page
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

    //test adding a user

  describe('POST api/users', function () {
    it('creates a new user when signing up', function () {
      return agent

      //suppyling fake user object

      .post('api/users')
      .send({
        email: 'sentEmail@email.com',
        password: 'testing123'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.email).to.equal('sentEmail@email.com');
        expect(res.body.password).to.equal('testing123');
      });
    });
  });

    it('throws an error if email or password is empty', function () {

      return agent
      .post('api/users')
      .send({
        email: null,
        password: null,
      })
      .expect(500)
    });

  describe('PUT api/users/:id', function () {
    var userTest;

    beforeEach(function () {

      return User.create({
        email: 'rando@test.com',
        password: 'rando123',
        isAdmin: false,
      })
      .then(function (createdUser){
        userTest = createdUser;
      })
    });

    //it will update the user password

    it('updates the admin status of the user', function () {

      return agent
      .put('/users/' + users.id)
      .send({
        password: 'register123'
      })
      .expect(200)
      .expect(function(res) {
        expect(res.body.password).to.equal('register123')
      });
    });
  });

  describe('DELETE api/users/:id', function () {
    
    var deleteTest;
    
        beforeEach(function () {
          
          var createEmail = [
        {email: 'emailTest@email.com'},
        {email: 'anotherEmail@email.com'},
        {email: 'thirdEmail@email.com'}
        ]
        .map(data => User.create(data));
    
        return Promise.all(createEmail)
        .then(createdEmail => {
          deleteTest = createdEmail;
        });

        it('deletes the user', function () {

          return agent
          .delete('/api/users/1')
          .expect(204)
          .expect(function () {
            expect(deleteTest.to.have.length(2));
          })

        })
      })
    })

  

}); // end describe('User routes')



/*

GET
all products *product*
products by category *product*
products by id *product*
all reviews by foreign product id 
all orders by user id *user* *done from get userid*
all orders 
single order by order id 
all users *user* *done*

POST
single order
single review
single product *product*
product category
single user *user* *done*

DELETE
single user *user* *done*

PUT
single user by user id to update user pw
single product *product*
single user *user* *done*

*/