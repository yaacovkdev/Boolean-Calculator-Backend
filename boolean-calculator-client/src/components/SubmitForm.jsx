import { useRef, useState } from "react";
import axios from "axios";
import "./SubmitForm.scss";
import GenerateTable from "./GenerateTable";

function SubmitForm(props) {
  const inputFormula = useRef();

  const [tabledata, setTabledata] = useState(null);

  const submitFormula = async () => {
    //post the formula to the api
    let config = {
      headers: {
        "Content-Type": "text/plain",
      },
      responseType: "text",
    };

    let raw_data = null;

    try {
      const response = await axios.post(
        "http://localhost:8080/stuff",
        inputFormula.current.value,
        config
      );

      raw_data = response.data;
      
      setTabledata(JSON.parse(raw_data));
    } catch (err) {
      console.error(err);
      setTabledata(JSON.stringify(raw_data));
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
            Post
          </button>
        </div>
        <p id="text-tag">Finally Here!</p>
      </div>

      <div className="submit-form__output">
        <GenerateTable data={tabledata}/>
      </div>
    </div>
  );
}

export default SubmitForm;
