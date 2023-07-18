import React, { useState, useEffect } from "react";
import "./Stock.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { get, getFilter, remove, getPdf } from "../../services/stock";
import ModalAdd from "../../components/Stock/modalAdd";
import ModalEdit from "../../components/Stock/modalEdit";
import { AlertBasic, AlertConfirm } from "../../components/Alert";
import moment from "moment";
import Swal from "sweetalert2";

function Stock() {
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

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
    const response = await AlertConfirm('Exclusão', 'Tem certeza que deseja excluir este lançamento, id: ' + id + ".", 'question')
    if(response.isConfirmed){
      const result = await remove(id);
      if (result.status === 200) {
        updateTabela(id);
        AlertBasic("Exclusão", "Estoque excluído com sucesso.", "success");
      }
    }
  };

  const updateTabela = (id) => {
    var dataUpdate = data.filter((x) => x.id !== id);
    setData(dataUpdate);
  };

  const filterDate = async () => {
    if (dataInicial === "" || dataFinal === "") {
      AlertBasic(
        "Atenção",
        "Preencher campo de Data Inicial e Final para aplicar o filtro.",
        "error"
      );
      return;
    }
    const response = await getFilter(dataInicial, dataFinal);
    setData(response.data);
  };

  const downloadPdf = async () => {
    if (dataInicial === "" || dataFinal === "") {
      AlertBasic(
        "Atenção",
        "Preencher campo de Data Inicial e Final para realizar o download.",
        "error"
      );
      return;
    }
    await getPdf(dataInicial, dataFinal);
  };

  return (
    <div className="container-sm container">
      <br />
      <header>
        <h2>Lista de Estoque</h2>
        <div>
          <button
            className="btn btn-dark"
            onClick={() => {
              downloadPdf();
            }}
          >
            Download
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              filterDate();
            }}
          >
            Filtrar
          </button>
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
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label>Data Inicial</label>
            <input
              className="form-control"
              type="datetime-local"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label>Data Final</label>
            <input
              className="form-control"
              type="datetime-local"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
        </div>
      </div>
      <br />
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
              <td
                className={
                  s.receipt === true
                    ? "bg-success text-white"
                    : "bg-danger text-white"
                }
              >
                {s.receipt === true ? "Entrada" : "Saída"}
              </td>
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
