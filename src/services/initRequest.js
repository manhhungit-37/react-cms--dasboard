import axios from 'axios';

//action
import { showLoading, hideLoading, setToast } from 'actions/app.action';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  showSpinner: false
})

function getAccessToken() {
  const accessToken = window.localStorage.getItem('accessToken');
  return accessToken;
}

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
      // show spinner
      if (config.showSpinner) {
        requestCount += 1;
        store.dispatch(showLoading());
      }
      // show toast
      if(config.showToast) {
        store.dispatch(setToast({
          status: 400,
          message: ''   
        }));
      }
      // add x-auth-token
      const accessToken = getAccessToken();
      if(accessToken) {
        config.headers['x-auth-token'] = accessToken;
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
    async (error) => {
      if (error && error.config.showSpinner) {
        decreaseRequestCount();
      }

      // access token expired
      // if(error.response.status === 401 && error.config._retry) {
      //   error.config._retry = true;
      //   try {
      //     const result = await instance.post("/auth/refreshtoken", {
      //       refreshToken: 'xxx'
      //     });
      //     window.localStorage.setItem("accessToken", result.data.accessToken);
      //     instance.defaults.headers.common["x-access-token"] =  result.data.accessToken;

      //     return instance(error.config);
      //   } catch (err) {
      //     if (err.response && err.response.data) {
      //       return Promise.reject(err.response.data);
      //     }
      //     return Promise.reject(err);
      //   }
      // }

      // handle errors
      const { status } = error.response;
      switch(status) {
        case 400: {
          store.dispatch(setToast({
            status,
            message: error.response?.data?.msg || ''   
          }));
          break;
        }
        case 500: {
          store.dispatch(setToast({
            status,
            message: error.response?.data?.msg || ''   
          }));
          break;
        }
        default:
          break;
      }
      return Promise.reject(error);
    }
  )
}


