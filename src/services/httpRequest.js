import { instance } from './initRequest';

class HttpRequest {
  async post(url, data = {}, config) {
    return instance.post(url, data, {
      headers: {
        'x-auth-token': window.localStorage.getItem('token')
      },
      ...config
    });
  }

  async get(url, config) {
    return instance.get(url, {
      headers: {
        'x-auth-token': window.localStorage.getItem('token')
      },
      ...config
    });
  }

  async delete(url, config) {
    return instance.delete(url, {
      headers: {
        'x-auth-token': window.localStorage.getItem('token')
      },
      ...config
    });
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;