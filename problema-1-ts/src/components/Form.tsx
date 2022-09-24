import React, { useState } from "react";

export const Form = ({
  setTexts,
}: {
  setTexts: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!text) return setError(true);

    setError(false);
    setTexts((prevState) => [...prevState, text]);
    setText("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        className={`form__input ${error ? "form__input-error" : ""}`}
        name="word"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe algo..."
      />
      {error && <p className="error">No se puede agregar text vacio.</p>}
      <button type="submit" className="form__button">
        Agregar palabra
      </button>
    </form>
  );
};
