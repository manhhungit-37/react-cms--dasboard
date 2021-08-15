import authServices from "services/authService";

// actions
import { setToast } from 'actions/app.action';

export const LOGOUT = "USER/LOGOUT";
export const SET_USER = "USER/SET_USER";

export const register = (data, history) => async dispatch => {

  await authServices.post("/api/user/register", data, {
    headers: {
      'Content-Type': 'application/json'
    },
    showSpinner: true
  })
  history.push("/login");
}

export const login = (data, history) => async dispatch => {
  const res = await authServices.post("/api/user/login", data, {
    headers: {
      'Content-Type': 'application/json'
    },
    showSpinner: true
  })
  const { token } = res.data;
  window.localStorage.setItem("token", token);
  dispatch(setToast({ status: res.status, message: 'Login successfully' }))
  history.push("/dashboard/report");

}

export const setUser = payload => {
  return {
    type: SET_USER,
    payload,
  }
}

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: LOGOUT };
}