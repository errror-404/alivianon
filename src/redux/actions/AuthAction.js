export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";

export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
  payload: null,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const handleLogin = async (user) => {
  return (dispatch) => {
    dispatch(login(user));
  };
};

export const LogoutAction = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export const handleUpdateUser = async (user) => {
  return (dispatch) => {
    dispatch(updateUser(user));
  };
};
