import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { put } from "../../services/stock";
import { AlertBasic } from "../Alert";
import { get } from "../../services/merchandise";

function ModalEdit(props) {

  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [receipt, setReceipt] = useState('');
  const [merchandiseId, setMerchandiseId] = useState('');
  const [dataMerchandises, setDataMerchandises] = useState([]);

  const putSt = async () => {
    let obj = {
      id: id,
      quantity: quantity,
      date: date,
      location: location,
      receipt: receipt === "true" ? true : false,
      merchandiseId: merchandiseId,
    };

    if(!checkInput(obj))
      return;

    var result = await put(id, obj);
    console.log(result);
    if (result.status === 200) {
      props.func();
      props.funcUpdate();
      AlertBasic('Atualizar', 'Mercadoria atualizada com sucesso', 'success');
    }else {
      AlertBasic('Atualizar', 'Mercadoria atualizada com sucesso', 'error');
    }

  };

  const setData = () => {
    const response = props;
    console.log(response);
    setId(response.obj.id);
    setQuantity(response.obj.quantity);
    setDate(response.obj.date);
    setLocation(response.obj.location);
    setReceipt(response.obj.receipt);
    setMerchandiseId(response.obj.merchandiseId);
  }

  const checkInput = (obj) => {
    for (var prop in obj) {
      if(obj[prop] === ''){
        AlertBasic("Atenção", "Preencher todos os campos para atualizar a estoque.", "error");
        return false;
      } ;
    }
    return true;
  };

  const getMerchandises = async () => {
    const result = await get();
    setDataMerchandises(result.data);
  };

  useEffect(() => {
    const init = async () => {
      setData();
      getMerchandises();
    };
    init();
    setData();
  }, [props]);

  return (
    <Modal isOpen={props.visible}>
      <ModalHeader className="modalHeader"> Editar Mercadorias </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Código:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="id"
            disabled={true}
            value={id}
          />
          <label>Mercadoria:</label>
          <br />
          <select
            name="merchandiseId"
            className="form-control"
            value={merchandiseId}
            onChange={(e) => setMerchandiseId(e.target.value)}
          >
            {/* <option selected>Selecione...</option> */}
            {dataMerchandises.map((m) => (
              <option value={m.id}>{m.name}</option>
            ))}
          </select>
          <br />
          <label>Quantidade:</label>
          <br />
          <input
            type="number"
            className="form-control"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
          <br />
          <label>Data:</label>
          <br />
          <input
            type="datetime-local"
            className="form-control"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            placeholder={date}
          />
          <br />
          <label>Local:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="type"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <br />
          <label>Status:</label>
          <br />
          <select
            name="receipt"
            value={receipt}
            className="form-control"
            onChange={(e) => setReceipt(e.target.value)}
          >
            {/* <option selected>Selecione...</option> */}
            <option value={"true"}>Entrada</option>
            <option value={"false"}>Saída</option>
          </select>
          <br />
        </div>
      </ModalBody>
      <ModalFooter className="modalFooter">
        <button
          className="btn btn-primary"
          onClick={() => {
            putSt();
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
