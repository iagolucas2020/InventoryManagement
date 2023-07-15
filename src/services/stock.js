import { api } from './api';

async function get() {
  return await api.get('/Stocks/stocks');
}

//POST
async function post(stock) {
  console.log('post');
  console.log(stock);
  const response = await api.post(
    '/Stocks',
    stock,
  );
  return response;
}

//PUT
async function put(id, stock) {
  const response = await api.put(
    '/Stocks/'+ id,
    stock,
  );
  return response;
}

//Delete
async function remove(id) {
  const response = await api.delete(
    '/Stocks/' + id,
  );
  return response;
}

export { get, post, put, remove };
