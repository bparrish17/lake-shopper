/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
//export {default as ProductList} from './ProductList'
export {default as Main} from './main'
export {default as ViewCart} from './ViewCart'
export {default as UserHome} from './user-home'
export {default as SingleUser} from './singleUser';
export {default as ReviewForm} from './ReviewForm';
export {default as SingleReview} from './singleReview';
export {default as SingleProductProfile} from './singleProductProfile';
export {default as SingleCategory} from './singleCategory';
export {default as AdminPortal} from './adminPortal'
export {default as EditProduct} from './editProduct'
export {default as EditOrder} from './editOrder'
export {default as AddProduct} from './addProduct'
export {default as AddCategory} from './addCategory'
export {Login, Signup} from './auth-form'
export {default as Checkout} from './CheckoutPage'
export {default as singleProductProfile} from './singleProductProfile'

console.log('changes for merge')