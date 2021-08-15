import authServices from "services/authService"

export const LOGIN_SUCCESS = "USER/LOGIN_SUCCESS";
export const LOGOUT = "USER/LOGOUT";
export const SET_USER = "USER/SET_USER";
export const SET_MESSAGE = "USER/SET_MESSAGE";

export const register = (data, history) => async dispatch => {
  try {
    await authServices.post("/api/user/register", data, {
      headers: {
        'Content-Type': 'application/json'
      },
      showSpinner: true
    })
    history.push("/login");
  } catch (error) {
    const { msg } = error.response.data;
    dispatch({ type: SET_MESSAGE, payload: msg });
  }
}

export const login = (data, history) => async dispatch => {
  try {
    const res = await authServices.post("/api/user/login", data, {
      headers: {
        'Content-Type': 'application/json'
      },
      showSpinner: true
    })
    const { token } = res.data;
    window.localStorage.setItem("token", token);
    dispatch({ type: LOGIN_SUCCESS })
    history.push("/dashboard/report");
  } catch (error) {
    const { msg } = error.response.data;
    dispatch({ type: SET_MESSAGE, payload: msg });
  }
}

export const setUser = payload => {
  return {
    type: SET_USER,
    payload,
  }
}

export const setMess = (payload) => {
  return {
    type: SET_MESSAGE,
    payload
  }
}

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: LOGOUT };
}