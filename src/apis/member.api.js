import httpRequest from '../services/httpRequest';

export function addMember(data) {
  return httpRequest.post('/api/member', data, { showToast: true });
}

export function fetchMembers(page = 1, limit = 10) {
  return httpRequest.get(`/api/member?page=${page}&limit=${limit}`)
}

export function getMember(id) {
  return httpRequest.get(`/api/member/${id}`);
}

export function deleteMember(id) {
  return httpRequest.delete(`/api/member/${id}`, { showToast: true });
}

export function updateMember(id, data) {
  return httpRequest.put(`/api/member/${id}`, data, { showToast: true });
}