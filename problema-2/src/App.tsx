import React, { FormEventHandler, useEffect, useMemo, useState } from "react";
import "./App.css";
import { useForm } from "./hooks/useForm";
import { Input } from "./components/Input";
import { Form } from "./components/Form";
import { TableHeader } from "./components/TableHeader";
import { TableCell } from "./components/TableCell";

export interface User {
  user: string;
  email: string;
  gender?: string;
  age: string;
  state?: string;
  city?: string;
}

function App() {
  const [users, setUsers] = useState<User[]>(
    JSON.parse(localStorage.getItem("users") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div className="main">
      <Form setUsers={setUsers} />
      <div className="table">
        <TableHeader />
        {users?.map((user, index) => (
          <TableCell key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
