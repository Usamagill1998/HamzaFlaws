const INITIAL_STATE = [];

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...action.payload];
    case "REMOVE_FROM_CART":
      return [...action.payload];
    case "GET_CART_PRODUCTS":
      return [...action.payload];
    case "EMPTY_CART":
      return [];
    default:
      return state;
  }
};

export default cartReducer;
