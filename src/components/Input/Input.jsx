import { useState } from "react";

function Input({ type, id }) {
  const [text, setText] = useState("");

  return (
    <>
      <input
        type={type}
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
}

export default Input;
