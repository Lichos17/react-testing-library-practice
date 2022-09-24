import React from "react";

export const TableCell = ({ text }: { text: string }) => {
  return (
    <React.Fragment>
      <p className="table__cell">{text}</p>
      <p className="table__cell">{text.split(" ").length}</p>
      <p className="table__cell">{text.split(" ")[0]}</p>
      <p className="table__cell">{text.split(" ").at(-1)}</p>
      <p className="table__cell">{text.split(" ").reverse().join(" ")}</p>
      <p className="table__cell">
        {text
          .split(" ")
          .filter((a, b) => a.localeCompare(`${b}`))
          .join(" ")}
      </p>
      <p className="table__cell">
        {text
          .split(" ")
          .filter((a, b) => a.localeCompare(`${b}`))
          .reverse()
          .join(" ")}
      </p>
    </React.Fragment>
  );
};
