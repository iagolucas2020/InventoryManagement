import axios from "axios";
import { api, linkApi } from "./api";

async function get() {
  return await api.get("/Stocks/stocks");
}

//GET FILTRO
async function getFilter(initial, final) {
  console.log(initial);
  console.log(final);
  const response = await api.get("/Stocks/filtro", {
    params: {
      initial: initial,
      final: final,
    },
  });
  return response;
}

//POST
async function post(stock) {
  const response = await api.post("/Stocks", stock);
  return response;
}

//PUT
async function put(id, stock) {
  const response = await api.put("/Stocks/" + id, stock);
  return response;
}

//Delete
async function remove(id) {
  const response = await api.delete("/Stocks/" + id);
  return response;
}

//GetPdf
async function getPdf(initial, final) {
  const data = {
    initial,
    final,
  };
  return axios({
    url: linkApi.link + "/Stocks/pdf",
    method: "GET",
    responseType: "blob",
    params: data,
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio.pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export { get, getFilter, post, put, remove, getPdf };
