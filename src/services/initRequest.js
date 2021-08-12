import axios from 'axios';

//action
import { showLoading, hideLoading } from 'actions/app.action';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  showSpinner: false
})

export default function initRequest(store) {
  let requestCount = 0;

  function decreaseRequestCount() {
    requestCount -= 1;
    if (requestCount === 0) {
      store.dispatch(hideLoading())
    }
  }

  instance.interceptors.request.use(
    config => {
      if (config.showSpinner) {
        requestCount += 1;
        store.dispatch(showLoading());
      }
      return config;
    },
    error => {
      if (error.config.showSpinner) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  )

  instance.interceptors.response.use(
    res => {
      if (res.config.showSpinner) {
        decreaseRequestCount();
      }
      return res;
    },
    error => {
      if (error && error.config.showSpinner) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  )
}


