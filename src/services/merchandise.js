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
  console.log(id);
  console.log(merchandises);
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

// async function getDocumentosColetaAssinar(codigoTecnico: string) {
//   return await api.get('/Assinatura/ListaDocumentosColetaAssinar', {
//     params: {
//       codigoTecnico: codigoTecnico,
//     },
//   });
// }

export { get, post, put, remove };
