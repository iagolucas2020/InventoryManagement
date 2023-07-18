import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { get } from "../../services/merchandise";
import { post } from "../../services/stock";
import { AlertBasic } from "../Alert";

function ModalAdd(props) {
  const [data, setData] = useState({
    id: "",
    quantity: "",
    date: "",
    location: "",
    receipt: "",
    merchandiseId: "",
  });

  const [dataMerchandises, setDataMerchandises] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const postSt = async () => {
    let obj = {
      quantity: data.quantity,
      date: data.date,
      location: data.location,
      receipt: data.receipt === "true" ? true : false,
      merchandiseId: data.merchandiseId,
    };

    if (!checkInput(obj)) return;

    const result = await post(obj);
    console.log(result);

    if (result.status === 201) {
      clear();
      props.func();
      props.funcUpdate();
      AlertBasic("Cadastro", "Estoque Cadastrada com sucesso", "success");
    } else if (result.status === 200) {
      AlertBasic("Atenção", result.data, "error");
    }
  };

  const clear = () => {
    setData({
      quantity: "",
      date: "",
      location: "",
      receipt: "",
      merchandiseId: "",
    });
  };

  const checkInput = (obj) => {
    for (var prop in obj) {
      if (obj[prop] === "") {
        AlertBasic(
          "Atenção",
          "Preencher todos os campos para cadastrar a estoque.",
          "error"
        );
        return false;
      }
    }
    return true;
  };

  const getMerchandises = async () => {
    const result = await get();
    setDataMerchandises(result.data);
  };

  useEffect(() => {
    const init = async () => {
      getMerchandises();
    };
    init();
  }, []);

  return (
    <Modal isOpen={props.visible}>
      <ModalHeader className="modalHeader"> Incluir Estoque </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Mercadoria:</label>
          <br />
          <select
            name="merchandiseId"
            className="form-control"
            onChange={handleChange}
          >
            <option selected>Selecione...</option>
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
            onChange={handleChange}
          />
          <br />
          <label>Data:</label>
          <br />
          <input
            type="datetime-local"
            className="form-control"
            name="date"
            onChange={handleChange}
          />
          <br />
          <label>Local:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="location"
            onChange={handleChange}
          />
          <br />
          <label>Status:</label>
          <br />
          <select
            name="receipt"
            className="form-control"
            onChange={handleChange}
          >
            <option selected>Selecione...</option>
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
            postSt();
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
