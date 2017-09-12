const db = require('./server/db');
const {User, Order, Review, Category, Product} = require('./server/db/models/index')

const users = [
  { email: 'brian@gmail.com' },
  { email: 'dom@yahoo.com' },
  { email: 'david@fsa.com' },
  { email: 'alex@gmail.com' }
];

const categories = [
    { name: 'Motorboats' },
    { name: 'Single Person' },
    { name: 'Multi Person' },
    { name: 'Paddle Boats' }
  ];

const products = [
    { name: 'jet ski', price: 2500, description: 'this is a jet ski', quantity: 10},
    { name: 'canoe', price: 600, description: 'this is a jet ski', quantity: 20},
    { name: 'kayak', price: 400, description: 'this is a jet ski', quantity: 3},
    { name: 'pontoon', price: 20000, description: 'this is a jet ski', quantity: 6},
    { name: 'row boat', price: 500, description: 'this is a jet ski', quantity: 9},
    { name: 'ski boat', price: 30000, description: 'this is a jet ski', quantity: 8},
]

const seed = () =>
  Promise.all(categories.map(category =>
    Category.create(category))
  )
  .then(() =>
  Promise.all(users.map(user =>
    User.create(user))
  ))
  .then(() =>
  Promise.all(products.map(product =>
    Product.create(product))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
