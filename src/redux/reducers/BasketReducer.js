import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  CLEAR_BASKET,
  ADD_MORE,
} from "../actions/BasketAction";

const initialState = {
  basket: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload],
        loading: false,
      };
    case REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter(
          (product) => product.id !== action.payload.id
        ),
        loading: false,
      };
    case CLEAR_BASKET:
      return {
        ...state,
        basket: [],
        loading: false,
      };
    case ADD_MORE:
      return {
        ...state,
        basket: state.basket.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity,
              }
            : product
        ),
        loading: false,
      };

    default:
      return state;
  }
};
