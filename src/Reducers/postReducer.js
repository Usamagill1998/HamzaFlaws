import _ from "lodash";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_PRODUCT":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "FETCH_PRODUCTS":
      return [...action.payload];

    default:
      return state;
  }
};

export default postReducer;
