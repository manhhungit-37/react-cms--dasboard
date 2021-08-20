export const LOGOUT = "USER/LOGOUT";
export const SET_USER = "USER/SET_USER";

export const setUser = payload => {
  return {
    type: SET_USER,
    payload,
  }
}

export const logout = (history) => {
  window.localStorage.removeItem("token");
  history.replace('/login');
  return { type: LOGOUT };
}