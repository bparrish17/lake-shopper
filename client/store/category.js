// import axios from "axios";
// /**
//  * ACTION TYPES
//  */
// const GET_CATEGORIES = "GET_CATEGORIES";
// const GET_CATEGORY = "GET_CATEGORY";
// const ADD_CATEGORY = "ADD_CATEGORY";
// const MODIFY_CATEGORY = "MODIFY_CATEGORY";
// const DELETE_CATEGORY = "DELETE_CATEGORY";

// /**
//  * ACTION CREATORS
//  */
// const getCategories = categories => {
//   return {
//     type: GET_CATEGORIES,
//     categories
//   };
// };

// const getCategory = category => {
//   return {
//     type: GET_CATEGORY,
//     category
//   };
// };

// const addCategory = category => {
//   return {
//     type: ADD_CATEGORY,
//     category
//   };
// };

// const modifyCategory = category => {
//   return {
//     type: MODIFY_CATEGORY,
//     category
//   };
// };

// const removeCategory = category => {
//   return {
//     type: DELETE_CATEGORY,
//     category
//   };
// };
// /**
//  * THUNK CREATORS
//  */
// export const fetchCategories = () => dispatch =>
//   axios
//     .get("/api/categories")
//     .then(result => result.data)
//     .then(categories => {
//       dispatch(getCategories(categories));
//     })
//     .catch(error => console.log("Unable to fetch Categories", error));

// export const fetchCategory = category => dispatch =>
//   axios
//     .get(`/api/categories/${category.id}`)
//     .then(result => result.data)
//     .then(category => {
//       dispatch(getCategory(category));
//     })
//     .catch(error => console.log("Unable to fetch Category", error));

// export const postCategory = category => dispatch =>
//   axios
//     .post("/api/categories", category)
//     .then(result => result.data)
//     .then(newCategory => {
//       dispatch(addCategory(newCategory));
//     })
//     .catch(error => console.log("Unable to add category", error));

// export const deleteCategory = category => dispatch =>
//   axios
//     .delete(`/api/categories/${category.id}`)
//     .then(() => {
//       dispatch(removeCategory(category));
//     })
//     .catch(error => console.log("Unable to delete category", error));

// export const updateCategory = category => dispatch =>
//   axios
//     .put(`/api/categories/${category.id}`, category)
//     .then(() => {
//       dispatch(modifyCategory(category));
//     })
//     .catch(error => console.log("Unable to update category", error));
// /**
//  * REDUCER
//  */
// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case GET_CATEGORIES:
//       return action.categories;
//     case GET_CATEGORY:
//       return action.category;
//     case ADD_CATEGORY:
//       return [...state, action.category];
//     case DELETE_CATEGORY:
//       return state.filter(category => category.id !== action.category.id);
//     case MODIFY_CATEGORY:
//       return state.map(
//         category =>
//           category.id === action.category.id ? action.category : category
//       );
//     default:
//       return state;
//   }
// }
