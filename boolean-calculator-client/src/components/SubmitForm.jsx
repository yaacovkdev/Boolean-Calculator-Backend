import { useRef } from "react";
import "./SubmitForm.scss";

function SubmitForm(props) {
  const inputFormula = useRef();

  const submitFormula = async () => {
    //post the formula to the api
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

      <div className="submit-form__output"></div>
    </div>
  );
}

export default SubmitForm;
