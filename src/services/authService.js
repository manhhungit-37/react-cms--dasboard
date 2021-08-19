import { instance } from './initRequest';

class AuthService {
  async post(url, data, config) {
    return instance.post(url, data, config);
  }

  async get(url, config) {
    return instance.get(url, config);
  }

  async delete(url, config) {
    return instance.delete(url, config);
  }
}

const authServices = new AuthService();

export default authServices;