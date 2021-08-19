export const LOGOUT = "USER/LOGOUT";
export const SET_USER = "USER/SET_USER";
export const SET_IS_SUCCESS = "USER/SET_IS_SUCCESS";

export const setUser = payload => {
  return {
    type: SET_USER,
    payload,
  }
}

export const setIsSuccess = payload => {
  return {
    type: SET_IS_SUCCESS,
    payload,
  }
}

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: LOGOUT };
}