const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
//const Product = db.model('product')
const agent = request.agent(app);

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const domsKayak = 'KayakDom'
    const domsPrice = '$120'
    const domsCategory = [1]
    const domsDescription = 'best kayak in the world'

    beforeEach(() => {
      return Product.create({
        name: domsKayak,
        price: domsPrice,
        category: domsCategory,
        description: domsDescription,
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(domsKayak)
        })
    })
  }) //end describe('/api/products/)
   
  describe('GET api/products/:id', () => {
    
    //user goes to their my profile page
    //create fake user emails

    var productsTest;

    beforeEach(function () {
      
      var createProducts = [
    {name: 'My Kayak', price: '$200', category: [1], description: 'pro'},
    {name: 'Your Kayak', price: '$250', category: [1], description: 'pro'},
    {name: 'Her Kayak', price: '$300', category: [1], description: 'pro'}
    ]
    .map(data => User.create(data));

    return Promise.all(createProducts)
    .then(createdProducts => {
      productsTest = createdProducts[1]
    });

    //test if route properly gets the id

    it('returns the JSON of the article based on the id', function () {

      return agent
      .get('api/products/' + productsTest.id)
      .expect(200)
      .expect(function (res) {
        if(typeof res.body === 'string') {
          res.body = JSON.parse(res.body);
        }
        expect(res.body.price).to.equal('$250');
        expect(res.body.name).to.equal('Your Kayak');
      });
    });
    });

    //test if route will give a 404 with an incorrect id

    it('returns a 404 error if the ID is not correct', function () {
      return agent
      .get('api/products/37463')
      .expect(404);
    })

  });// end describe('/api/products/:id')

  describe('GET api/products/category/:categoryId', function () {
    var productsCategoryTest;

    beforeEach(function () {
        
        var createCategoryProducts = [
      {name: 'My Kayak', price: '$200', category: [1], description: 'pro'},
      {name: 'Your Kayak', price: '$250', category: [2], description: 'pro'},
      {name: 'Her Kayak', price: '$300', category: [2], description: 'pro'}
      ]
      .map(data => User.create(data));
  
      return Promise.all(createCategoryProducts)
      .then(createdCategoryProducts => {
        productsCategoryTest = createdCategoryProducts.slice(1)
      });
    });

    it('gets an array of all products in the same category', function () {

        return agent
        .get('api/products/category/2')
        .expect(200)
        .expect(function (res) {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(2);
            expect(res.body[0].category[0]).to.equal(2)
        });
    });
});

  describe('POST api/products', function () {
    it('creates a new product when signing up', function () {
      return agent

      //suppyling fake product object

      .post('api/products')
      .send({name: 'My Kayak', 
            price: '$200', 
            category: [1], 
            description: 'pro'
            })
      .expect(200)
      .expect(function (res) {
        expect(res.body.name).to.equal('My Kayak');
        expect(res.body.description).to.equal('pro');
      });
    });
  });

    it('throws an error if description is empty', function () {

      return agent
      .post('api/products')
      .send({name: 'My Kayak', 
            price: '$200', 
            category: [1], 
            description: null
            })
      .expect(500)
    });



  describe('PUT api/products/:id', function () {
    var productTest;

    beforeEach(function () {

      return Product.create(
          {name: 'Kayak Update', 
          price: '$200', 
          category: [1], 
          description: 'pro'
          })
      .then(function (createdProduct){
        productTest = createdProduct;
      })
    });

    //it will update the user password

    it('updates the the product', function () {

      return agent
      .put('/products/' + productTest.id)
      .send({
        name: 'Kayak Updated',
        category: [1,2]
      })
      .expect(200)
      .expect(function(res) {
        expect(res.body.name).to.equal('Kayak Updated')
        expect(res.body.category).to.have.length(2);
      });
    });
  });

  describe('DELETE api/products/:id', function () {
    
    var deleteTest;
    
        beforeEach(function () {
          
          var createProducts = [
            {name: 'Here Kayak', price: '$200', category: [1], description: 'pro'},
            {name: 'Still Here Kayak', price: '$250', category: [2], description: 'pro'},
            {name: 'Delete Kayak', price: '$300', category: [2], description: 'pro'}
        ]
        .map(data => Product.create(data));
    
        return Promise.all(createProducts)
        .then(createdProducts => {
          deleteTest = createdProducts;
        });

        it('deletes the product', function () {

          return agent
          .delete('/api/users/2')
          .expect(204)
          .expect(function () {
            expect(deleteTest.to.have.length(2));
            expect(deleteTest[1].name).to.equal('Still Here Kayak');
          })

        })
      })
    })

  

}); // end describe('User routes')



/*

GET
all products *product* *done*
products by category *product* *done*
products by id *product* *done*
all reviews by foreign product id *review*
all orders by user id *user* *done from get userid*
all orders 
single order by order id 
all users *user* *done*

POST
single order 
single review *review*
single product *product* *done*
product category **pending if we make category**
single user *user* *done* 

DELETE
single user *user* *done*

PUT
single user by user id to update user pw
single product *product* *done*
single user *user* *done*

*/