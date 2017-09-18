// ACTION TYPES

const UPDATE_EMAIL = 'UPDATE_EMAIL';

// ACTION CREATORS

export function updateEmail (email) {
  const action = { type: UPDATE_EMAIL, email };
  return action;
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case UPDATE_EMAIL:
      return action.email;

    default:
      return state;
  }

}