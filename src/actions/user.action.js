import authServices from "services/authService"

export const LOGIN_SUCCESS = "USER/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "USER/LOGIN_FAILURE";
export const LOGOUT = "USER/LOGOUT";
export const SET_USER = "USER/SET_USER";

export const register = (data, history) => async () => {
  try {
    await authServices.post("/api/user/register", data, {
      headers: {
        'Content-Type': 'application/json'
      },
      showSpinner: true
    })
    history.push("/login");
  } catch (error) {
    console.log(error.response);
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
    history.push("/");
  } catch (error) {
    const { msg } = error.response.data;
    dispatch({ type: LOGIN_FAILURE, payload: { message: msg } });
  }
}

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
})

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: LOGOUT };
}