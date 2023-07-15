import axios from 'axios';
import { api, linkApi } from './api';

//Get
async function get() {
  return await api.get('/Merchandises');
}

//GetPdf
async function getPdf() {
  return axios({
    url: linkApi.link + '/Merchandises/pdf',
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'relatorio.pdf');
    document.body.appendChild(link);
    link.click();
  });
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

export { get, getPdf, post, put, remove };
