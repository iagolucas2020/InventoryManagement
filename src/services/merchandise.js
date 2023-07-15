import { api } from './api';

async function get() {
  return await api.get('/Merchandises');
}

//POST
async function post(merchandises) {
  const response = await api.post(
    '/Merchandises',
    merchandises,
  );
  return response;
}

//PUT
async function put(id, merchandises) {
  const response = await api.put(
    '/Merchandises/'+ id,
    merchandises,
  );
  return response;
}

//Delete
async function remove(id) {
  const response = await api.delete(
    '/Merchandises/' + id,
  );
  return response;
}

export { get, post, put, remove };
