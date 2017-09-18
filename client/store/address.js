// ACTION TYPES

const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

// ACTION CREATORS

export function updateAddress (address) {
  const action = { type: UPDATE_ADDRESS, address };
  return action;
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case UPDATE_ADDRESS:
      return action.address;

    default:
      return state;
  }

}