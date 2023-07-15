import React, { useState, useEffect } from "react";
import "./Merchandise.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { get, remove } from "../../services/merchandise";
import ModalAdd from "../../components/Merchandise/modalAdd";
import ModalEdit from "../../components/Merchandise/modalEdit";
import AlertBasic from "../../components/Alert";

function Merchandise() {
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

  const removeMc = async (id) => {
    const result = await remove(id);
    if (result.status === 200) {
      updateTabela(id);
      AlertBasic('Excluir', 'Mercadoria excluída com sucesso.', 'success');
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
        <h2>Lista de Mercadorias</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            openModal();
          }}
        >
          Novo
        </button>
      </header>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nome</th>
            <th>Número Registro</th>
            <th>Fabricante</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mc) => (
            <tr key={mc.id}>
              <td>{mc.id}</td>
              <td>{mc.name}</td>
              <td>{mc.registerNumber}</td>
              <td>{mc.manufacturer}</td>
              <td>{mc.type}</td>
              <td>{mc.description}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    openModalEdit(mc.id);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeMc(mc.id);
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

export default Merchandise;
