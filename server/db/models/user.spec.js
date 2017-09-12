/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {User, Order, Review, Category, Product} = require('./index')

//USER TESTS

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

//ORDER TESTS

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
  });
});

//REVIEW TESTS

describe('Review model', () => {
  let review = Review.build({
    //array of strings or integers?
    //productList: ["jet ski", "noodle", "motorboat"],
    rating: '3',
    comments: 'these are comments, blah blah blah it has to be more than 100 characters but like this should be more than that I hope idk if Im that far yet we will have to see'
  });
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(function () {
    return Promise.all([
      Review.truncate({ cascade: true })
    ]);
  });

  describe('review definition', function(){
    it('1: fields are all filled out', function () {
      return review.save()
      .then(function (savedReview) {
        //expect(savedOrder.productList).to.equal(['jet ski', 'noodle', 'motorboat'])
        expect(savedReview.rating).to.equal('3');
        expect(savedReview.comments).to.equal('these are comments, blah blah blah it has to be more than 100 characters but like this should be more than that I hope idk if Im that far yet we will have to see');
      });
    });
    it('2: cannot have comment of length less than 100', function () {
      review.comments = 'this should not work';
      return review.validate()
      .then(function () {
        throw new Error('validation should prevent comment with length less than 100');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });
    });
  });
});

//CATEGORY Model

describe('Category model', () => {
  let category = Category.build({
    name: ''
  });
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(function () {
    return Promise.all([
      Category.truncate({ cascade: true })
    ]);
  });

  describe('category definition', function(){
    it('it cannot have an empty name', function () {
      return category.validate()
      .then(function () {
        throw new Error('validation should prevent comment with length less than 100');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });
    });
  });
});

//PRODUCT tests

// describe('Product model', () => {
//   let product = Product.build({
//     name: 'Jet Ski',
//     price: 2000.00,
//     image: '',
//     description: 'this is a jet ski',
//     quantity: 4
//   });
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   afterEach(function () {
//     return Promise.all([
//       Product.truncate({ cascade: true })
//     ]);
//   });

//   describe('product definition', function(){
//     it('name, price, description, quantity are not false', function () {
//       return product.save()
//       .then(function (savedProduct) {
//         expect(savedProduct.name).to.equal('Jet Ski');
//         //expect(savedProduct.price).to.equal(2000.00);
//         //expect(savedProduct.description).to.equal('this is a jet ski');
//         //expect(savedProduct.quantity).to.equal(4);
//       });
//     })
//   });
// });