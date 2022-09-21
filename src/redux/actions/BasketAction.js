export const ADD_TO_BASKET = "ADD_TO_BASKET";
export const REMOVE_FROM_BASKET = "REMOVE_FROM_BASKET";
export const CLEAR_BASKET = "CLEAR_BASKET";
export const ADD_MORE = "ADD_MORE";

export const addToBasket = (product) => ({
  type: ADD_TO_BASKET,
  payload: product,
});

export const removeFromBasket = (product) => ({
  type: REMOVE_FROM_BASKET,
  payload: product,
});

export const clearBasket = () => ({
  type: CLEAR_BASKET,
});

export const addMore = (product) => ({
  type: ADD_MORE,
  payload: product,
});

export const handleAddToBasket = (product) => {
  return (dispatch) => {
    
    dispatch(addToBasket(product));
  };
};

export const handleRemoveFromBasket = (product) => {
  return (dispatch) => {
    dispatch(removeFromBasket(product));
  };
};

export const handleClearBasket = () => {
  return (dispatch) => {
    dispatch(clearBasket());
  };
};

export const handleAddMore = (product) => {
  return (dispatch) => {
    dispatch(addMore(product));
  };
};
