import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { post } from "../../services/merchandise";
import AlertBasic from "../Alert";
import './Modal.css'

function ModalAdd(props) {
  const [data, setData] = useState({
    id: "",
    name: "",
    registerNumber: "",
    manufacturer: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const postMc = async () => {
    let obj = {
      name: data.name,
      registerNumber: data.registerNumber,
      manufacturer: data.manufacturer,
      type: data.type,
      description: data.description,
    };

    if(!checkInput(obj))
      return;

    const result = await post(obj);
    if (result.status === 201) {
      clear();
      props.func();
      props.funcUpdate();
      AlertBasic("Cadastro", "Mercadoria Cadastrada com sucesso", "success");
    }

  };

  const clear = () => {
    setData({
      id: "",
      name: "",
      registerNumber: "",
      manufacturer: "",
      type: "",
      description: "",
    });
  };

  const checkInput = (obj) => {
    for (var prop in obj) {
      if(obj[prop] === ''){
        AlertBasic("Atenção", "Preencher todos os campos para cadastrar a mercadoria.", "error");
        return false;
      } ;
    }
    return true;
  };

  return (
    <Modal isOpen={props.visible}>
      <ModalHeader className="modalHeader"> Incluir Mercadorias </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nome:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
          />
          <br />
          <label>Número de Registro:</label>
          <br />
          <input
            type="number"
            className="form-control"
            name="registerNumber"
            onChange={handleChange}
          />
          <br />
          <label>Fabricante:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="manufacturer"
            onChange={handleChange}
          />
          <br />
          <label>Tipo:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="type"
            onChange={handleChange}
          />
          <br />
          <label>Descrição:</label>
          <br />
          <textarea
            type="text"
            className="form-control"
            name="description"
            onChange={handleChange}
          ></textarea>
          <br />
        </div>
      </ModalBody>
      <ModalFooter className="modalFooter">
        <button
          className="btn btn-primary"
          onClick={() => {
            postMc();
          }}
        >
          Incluir
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.func();
          }}
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalAdd;
