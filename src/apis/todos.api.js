import httpRequest from 'services/httpRequest';

export function fetchTodos(page = 1, limit = 10) {
  return httpRequest.get(`/api/todo?page=${page}&limit=${limit}`);
}
