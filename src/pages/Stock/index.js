import React, { useState, useEffect } from "react";
import "./Stock.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { get, remove } from "../../services/stock";
import ModalAdd from "../../components/Stock/modalAdd";
import ModalEdit from "../../components/Stock/modalEdit";
import AlertBasic from "../../components/Alert";
import moment from "moment";

function Stock() {
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let result = await get();
    if (result.status === 200) {
      setData(result.data);
    }
  };

  const openModal = () => {
    setVisibleModal(!visibleModal);
  };

  const openModalEdit = (id) => {
    var obj = data.filter((x) => x.id === id)[0];
    setDataEdit(obj);
    setVisibleEditar(!visibleModal);
  };

  const removeSt = async (id) => {
    const result = await remove(id);
    if (result.status === 200) {
      updateTabela(id);
      AlertBasic("Excluir", "Mercadoria excluída com sucesso.", "success");
    }
  };

  const updateTabela = (id) => {
    var dataUpdate = data.filter((x) => x.id !== id);
    setData(dataUpdate);
  };

  return (
    <div className="container-sm container">
      <br />
      <header>
        <h2>Lista de Estoque</h2>
        <div>
        <button className="btn btn-dark">Download</button>
          <button
            className="btn btn-success"
            onClick={() => {
              openModal();
            }}
          >
            Novo
          </button>
        </div>
      </header>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Mercadoria</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Local</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.merchandise.name}</td>
              <td>{s.quantity}</td>
              <td>{moment(new Date(s.date)).format("DD/MM/YYYY HH:mm:ss")}</td>
              <td>{s.location}</td>
              <td>{s.receipt === true ? "Entrada" : "Saída"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    openModalEdit(s.id);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeSt(s.id);
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAdd
        visible={visibleModal}
        func={() => {
          setVisibleModal(!visibleModal);
        }}
        funcUpdate={() => {
          getData();
        }}
      />
      <ModalEdit
        visible={visibleEditar}
        obj={dataEdit}
        func={() => {
          setVisibleEditar(!visibleEditar);
        }}
        funcUpdate={() => {
          getData();
        }}
      />
    </div>
  );
}

export default Stock;
