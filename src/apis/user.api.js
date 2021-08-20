//service
import httpRequest from 'services/httpRequest';

export function fetchUsers(page = 1, limit = 10) {
  return httpRequest.get(`/api/user?page=${page}&limit=${limit}`)
}

export function getUserAuth() {
  return httpRequest.post("/api/auth")
}

export function deleteUser(id) {
  return httpRequest.delete(`/api/user/${id}`)
}