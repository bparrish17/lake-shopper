/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {User, Order, Review} = require('./index')

describe('User model', () => {
  let user = User.build({
    // ipAddress: '172.00.11.01',
    email: 'email@email.com',
    password: '12345kjsdf',
    isAdmin: false,
    isGuest: false
  });
  let user2 = User.build({
    // ipAddress: '',
    email: '',
    // password: '',
    isAdmin: true,
    isGuest: true
  })
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(function () {
    return Promise.all([
      User.truncate({ cascade: true })
    ]);
  });

  describe('user definition', function(){
      it('1: fields are all filled out', function () {
        return user.save()
        .then(function (savedUser) {
          // expect(savedUser.ipAddress).to.equal('172.00.11.01')
          expect(savedUser.email).to.equal('email@email.com');
          //expect(savedUser.password).to.equal('12345kjsdf');
          expect(savedUser.isAdmin).to.equal(false);
        });
      })
      it('2: cannot be both isGuest and isAdmin', function () {
        return user2.validate()
        .then(function () {
          throw new Error('validation should fail when content is null');
        },
        function(result) {
          expect(result).to.be.an.instanceOf(Error);
        });
      });
    });
  });

describe('Order model', () => {
  let order = Order.build({
    //array of strings or integers?
    //productList: ["jet ski", "noodle", "motorboat"],
    address: '1601 Tree Lane',
    status: "created",
    subtotal: 80.75,
    checkoutDate: Date.now()
  });
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(function () {
    return Promise.all([
      Order.truncate({ cascade: true })
    ]);
  });

  describe('order definition', function(){
    it('1: fields are all filled out', function () {
      return order.save()
      .then(function (savedOrder) {
        //expect(savedOrder.productList).to.equal(['jet ski', 'noodle', 'motorboat'])
        expect(savedOrder.address).to.equal('1601 Tree Lane');
        expect(savedOrder.subtotal).to.equal(80.75);
        expect(savedOrder.status).to.equal('created');
      });
    });
    it('2: cannot have a status that is not within the options list', function () {
      order.status = 'this wont work dawg';
      return order.validate()
      .then(function () {
        throw new Error('validation should fail when status is wrong');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });
    });
  });
});


