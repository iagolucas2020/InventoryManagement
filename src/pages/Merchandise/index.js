import React, { useState, useEffect } from "react";
import "./Merchandise.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { get } from "../../services/merchandise";

function Merchandise() {
  const [data, setData] = useState([]);

  const getData = async () => {
    let result = await get();
    if(result.status === 200){
      setData(result.data)
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="container-sm container">
      <br />
      <header>
        <button className="btn btn-success">Adicionar</button>
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
          {data.map(mc => (
            <tr key={mc.id}>
              <td>{mc.id}</td>
              <td>{mc.name}</td>
              <td>{mc.registerNumber}</td>
              <td>{mc.manufacturer}</td>
              <td>{mc.type}</td>
              <td>{mc.description}</td>
              <td>
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Merchandise;
