import { api } from './api';

async function get() {
  return await api.get('/Merchandises');
}

export { get };
