import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./Input.css";
import { FormContext } from "../providers/FormContext";
import { use } from "react";

function Input({ type, id, label, checkOnBlur, placeholder }, ref) {
  const { formInput, setFormInput } = useContext(FormContext);
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [shake, setShake] = useState(false);

  //introduce a local ref  local to component

  const localRef = useRef(null);

  useEffect(() => {
    setIsValid(true);
    setShake(false);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus: () => localRef.current.focus(),
        setInvalid: () => setIsValid(false),
        shake: () => setShake(true),
      };
    },
    []
  );

  return (
    <>
      <input
        className={`${!isValid ? "error-input" : ""} ${shake ? "shake" : ""}`}
        ref={localRef}
        type={type}
        id={id}
        value={text}
        placeholder={placeholder ? placeholder : ""}
        onBlur={checkOnBlur}
        onChange={(e) => {
          setText(e.target.value);
          setFormInput({ ...formInput, [label]: e.target.value });
        }}
      />
      <br />

      <span>{!isValid ? `${label} is invalid` : ""}</span>
    </>
  );
}

export default React.forwardRef(Input);
