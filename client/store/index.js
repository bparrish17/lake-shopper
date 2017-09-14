import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import categories from './category'
import products from './product'
import orders from './order'
import reviews from './review'

const reducer = combineReducers({user, products, categories, orders, reviews})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './category'
export * from './product'
export * from './order'
export * from './review'
