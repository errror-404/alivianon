import { LOGIN, LOGOUT, UPDATE_USER } from "../actions/AuthAction";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
      };
    //handle specific updates
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
