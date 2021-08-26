import httpRequest from 'services/httpRequest';

export function fetchPhotos(page = 1, limit = 10) {
  return httpRequest.get(`/api/photo?page=${page}&limit=${limit}`);
}

export function getPhoto(id) {
  return httpRequest.get(`/api/photo/${id}`);
}

export function addPhoto(data) {
  return httpRequest.post('/api/photo', data);
}

export function updatePhoto(id, data) {
  return httpRequest.put(`/api/photo/${id}`, data);
}