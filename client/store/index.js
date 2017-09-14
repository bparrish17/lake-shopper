import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import categories from './category'
import products from './product'
import cart from './cart'

const reducer = combineReducers({user, products, categories, cart})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './category'
export * from './product'
export * from './cart'
