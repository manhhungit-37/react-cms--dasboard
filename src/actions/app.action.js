const SHOW_LOADING = "APP/SHOW_LOADING";
const HIDE_LOADING = "APP/HIDE_LOADING";

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