import axios from "axios";

const defaultReviews = []
/**
 * ACTION TYPES
 */
const GET_REVIEWS = "GET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";

/**
 * ACTION CREATORS
 */
const getReviews = reviews => {
  return {
    type: GET_REVIEWS,
    reviews
  };
};

const addReview = review => {
  return {
    type: ADD_REVIEW,
    review
  };
};

/**
 * THUNK CREATORS
 */
export const fetchReviews = (productId) => dispatch =>
  axios
    .get(`/api/reviews/${productId}`)
    .then(result => result.data)
    .then(reviews => {
      dispatch(getReviews(reviews));
    })
    .catch(error => console.log("Unable to fetch reviews", error));


export const postReview = (productId, rating, comment) => 
  dispatch =>
    axios
      .post(`/api/reviews/${productId}`, {rating: rating, comments: comment})
      .then(result => {
        console.log('GETTING HERE FINE');
        return result.data;
      })
      .then(newReview => {
        dispatch(addReview(newReview));
      })
      .catch(error => console.log("Unable to add review", error));

/**
 * REDUCER
 */
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
}
