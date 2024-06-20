import { useEffect, useRef, useState } from "react";
import "./SubmitForm.scss";
import GenerateTable from "./GenerateTable";

function SubmitForm() {
  const inputFormula = useRef();
  const [tableData, setTableData] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("WebSocket connection to Calculator established");
    };

    ws.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response.status);

      if (response.status === 400) {
        console.log("Error:", response.message);
      } else if (response.status === 200) {
        if (response.data[0] === "Error") {
          console.log("Error:", response.data[1]);
        } else {
          setTableData(response.data);
        }
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection to Calculator closed");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const submitFormula = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(inputFormula.current.value));
    } else {
      console.error('WebSocket connection error');
    }
  };

  return (
    <div className="submit-form">
      <div className="submit-form__input">
        <div className="submit-form__input-field">
          <input
            id="boolean-input-field"
            placeholder="Write Boolean Formula"
            ref={inputFormula}
          />
          <button id="boolean-input-button" onClick={submitFormula}>
            Solve
          </button>
        </div>
        <p id="text-tag">Finally Here!</p>
      </div>

      <div className="submit-form__output">
        <GenerateTable data={tableData} />
      </div>
    </div>
  );
}

export default SubmitForm;
