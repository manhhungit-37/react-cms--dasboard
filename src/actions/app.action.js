export const SHOW_LOADING = "APP/SHOW_LOADING";
export const HIDE_LOADING = "APP/HIDE_LOADING";

export const SET_TOAST = "APP/SET_TOAST";

export const showLoading = () => {
  return {
    type: SHOW_LOADING
  }
}

export const hideLoading = () => {
  return {
    type: HIDE_LOADING
  }
}

export const setToast = ({ status = 400, message = '' }) => {
  return {
    type: SET_TOAST,
    payload: {
      status,
      message
    }
  }
}