import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { TableCell } from "./components/TableCell";
import { TableHeader } from "./components/TableHeader";

function App() {
  const [texts, setTexts] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("texts") || "[]")
  );
  const [filteredTexts, setFilteredTexts] = useState(texts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("texts", JSON.stringify(texts));
  }, [texts]);

  useEffect(() => {
    setFilteredTexts(texts.filter((text) => text.includes(search)));
  }, [search, texts]);

  return (
    <div className="main">
      <Form setTexts={setTexts} />

      <input
        type={"text"}
        className="form__input form__input--search"
        placeholder="Buscar texto"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table">
        <TableHeader />
        {filteredTexts?.map((text, index) => (
          <TableCell key={index} text={text} />
        ))}
      </div>
    </div>
  );
}

export default App;
