import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { put } from "../../services/merchandise";
import AlertBasic from "../Alert";

function ModalEdit(props) {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const putMc = async () => {
    let obj = {
      id: id,
      name: name,
      registerNumber: registerNumber,
      manufacturer: manufacturer,
      type: type,
      description: description,
    };

    if(!checkInput(obj))
      return;

    var result = await put(id, obj);
    console.log(result);
    if (result.status === 200) {
      props.func();
      props.funcUpdate();
      AlertBasic('Atualizar', 'Mercadoria atualizada com sucesso', 'success');
    }

  };

  const setData = () => {
    const response = props;
    setId(response.obj.id);
    setName(response.obj.name);
    setRegisterNumber(response.obj.registerNumber);
    setManufacturer(response.obj.manufacturer);
    setType(response.obj.type);
    setDescription(response.obj.description);
  }

  const checkInput = (obj) => {
    for (var prop in obj) {
      if(obj[prop] === ''){
        AlertBasic("Atenção", "Preencher todos os campos para atualizar a mercadoria.", "error");
        return false;
      } ;
    }
    return true;
  };

  useEffect(() => {
    setData();
  }, [props]);

  return (
    <Modal isOpen={props.visible}>
      <ModalHeader> Editar Mercadorias </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Código:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="name"
            disabled={true}
            value={id}
          />
          <label>Nome:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <br />
          <label>Número de Registro:</label>
          <br />
          <input
            type="number"
            className="form-control"
            name="registerNumber"
            onChange={(e) => setRegisterNumber(e.target.value)}
            value={registerNumber}
          />
          <br />
          <label>Fabricante:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="manufacturer"
            onChange={(e) => setManufacturer(e.target.value)}
            value={manufacturer}
          />
          <br />
          <label>Tipo:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
          <br />
          <label>Descrição:</label>
          <br />
          <textarea
            type="text"
            className="form-control"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-primary"
          onClick={() => {
            putMc();
          }}
        >
          Editar
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

export default ModalEdit;
