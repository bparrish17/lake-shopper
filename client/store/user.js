import axios from "axios";
import history from "../history";
import {postOrder} from "./order";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const GET_USER_PAGE = "GET_USER_PAGE";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const getUserPage = user => ({type: GET_USER_PAGE, user});
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get("/auth/me")
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const signup = (user, ownProps) => dispatch =>
  axios
    .post("/api/users", user)
    .then(() => {
      dispatch();
      ownProps.history.push("/");
    })
    .catch(() => dispatch());

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(res => {
      dispatch(getUser(res.data));
      history.push("/home");
    })
    .catch(error => dispatch(getUser({ error })));

export const logout = () => dispatch =>
  axios
    .post("/auth/logout")
    .then(res => {
      dispatch(removeUser());
      history.push("/login");
    })
    .catch(err => console.log(err));

export const postGuest = (info) => {
  
  return dispatch => {
    axios.post('/api/users/', info[0])
      .then(res => {
        return res.data
      })
      .then(posted => {
        dispatch(postOrder({userId: posted.id, address: info[1].address}))
      })
      .catch(err => {
        console.log(err)
      })
  }
}


export const postUserCheckout = (info) => {
  return dispatch => {
    dispatch(postOrder({userId: info[0], address: info[1].address}))
  }
}

export const getUserPageThunk = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}`)
      .then(res => res.data)
      .then(user => {
        dispatch(getUserPage(user))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case GET_USER_PAGE:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
