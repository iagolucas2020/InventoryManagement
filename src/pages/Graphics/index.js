import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart } from "react-google-charts";
import { get } from "../../services/merchandise";
import { getMerchandisesId } from "../../services/stock";
import moment from "moment/moment";
import "moment/locale/pt-br";
import "./Graphics.css";
import { AlertBasic } from "../../components/Alert";

function Graphics() {
  const [dataMerchandises, setDataMerchandises] = useState([]);
  const [months, setMonths] = useState([]);
  const [inn, setInn] = useState([]);
  const [out, setOut] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    const init = async () => {
      getMerchandises();
    };
    init();
  }, []);

  const getMerchandises = async () => {
    const result = await get();
    setDataMerchandises(result.data);
  };

  const getDataStockByMerchandisesId = async (id) => {
    if (id !== "0") {
      var title = dataMerchandises.filter((x) => x.id === Number(id))[0].name;
      setTitle(title);
      const result = await getMerchandisesId(id);
      builtArray(result.data);
    } else {
      AlertBasic("Atenção", "Selecione a mercadoria.", "error");
    }
  };

  const builtArray = (array) => {
    let months = [];
    let ent = [];
    let sai = [];

    for (let i = 0; i < array.length; i++) {
      let flag = false;
      let month = moment(array[i].date).format("MMMM");
      if (months.length === 0) {
        months.push(month);
      } else {
        for (let j = 0; j < months.length; j++) {
          if (months[j] === month) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          months.push(month);
        }
      }
    }

    for (let i = 0; i < months.length; i++) {
      ent.push(0);
      sai.push(0);
    }

    for (let i = 0; i < months.length; i++) {
      for (let j = 0; j < array.length; j++) {
        let monthLoop = moment(array[j].date).format("MMMM");
        if (monthLoop === months[i]) {
          if (array[j].receipt === true) {
            let sum = ent[i] + array[j].quantity;
            ent[i] = sum;
          } else {
            let sum = sai[i] + array[j].quantity;
            sai[i] = sum;
          }
        }
      }
    }

    setMonths(months);
    setInn(ent);
    setOut(sai);
  };

  const dataBase = {
    months: months,
    Entrada: inn,
    Saida: out,
  };

  let arrIndice = Object.keys(dataBase);
  let arrValues = Object.values(dataBase);

  let data = [];

  for (let i = 0; i < arrValues[0].length; i++) {
    data[i] = arrValues.map((item) => {
      return item[i];
    });
  }

  data.unshift(arrIndice);

  const options = {
    title: title,
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: { format: "currency" },
    animation: { duration: 500, easing: "linear", startup: true },
  };

  return (
    <div className="container-sm container">
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label>Mercadoria</label>
            <select
              className="form-control"
              onChange={(e) => {
                getDataStockByMerchandisesId(e.target.value);
              }}
            >
              <option value={0} select>
                Selecione...
              </option>
              {dataMerchandises.map((m) => (
                <option value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {months.length > 0 ? (
        <Chart
          chartType="ColumnChart"
          data={data}
          width="100%"
          height="400px"
          options={options}
          chartLanguage="pt-BR"
          legendToggle
        />
      ) : (
        <h3>Esta mercadoria não possui lançamento de estoque.</h3>
      )}
    </div>
  );
}

export default Graphics;
