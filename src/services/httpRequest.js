import { instance } from './initRequest';

class HttpRequest {
  async post(url, data = {}, config) {
    return instance.post(url, data, config);
  }

  async get(url, config) {
    return instance.get(url, config);
  }

  async delete(url, config) {
    return instance.delete(url, config);
  }

  async put(url, data, config) {
    return instance.put(url, data, config);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;