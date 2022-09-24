import React, { useMemo, useState } from "react";
import { User } from "../App";
import { useForm } from "../hooks/useForm";
import { Input } from "./Input";

// Se debe validar que la contraseña coincida con la confirmación y que tenga mínimo 6
// caracteres y máximo 12
// ● Validar que el email tenga el formato correcto(Expresión regular)
// ● Validar que sea mayor de edad
// ● Agregar mínimo dos estados y tres ciudades por cada estado
// ● Campos requeridos: Usuario, Contraseña, Email, Edad

const formValidations = {
  email: [(value: string) => value.includes("@"), "El correo debe tener un @"],
  user: [(value: string) => value.length > 0, "El usuario es requerido"],
  age: [(value: number) => value >= 18, "Debes ser mayor de edad"],
};

const formData = {
  user: "",
  email: "",
  gender: "",
  age: "",
  state: "",
  city: "",
  password: "",
  password2: "",
};

export const Form = ({
  setUsers,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const states = useMemo(
    () => ({
      Yucatan: ["Merida", "Progreso", "Telchac"],
      "Nuevo Leon": ["Monterrey", "Santa Catarina, Juarez"],
    }),
    []
  );

  const {
    formState,
    user,
    email,
    gender,
    age,
    state,
    city,
    password,
    password2,
    onInputChange,
    userValid,
    emailValid,
    ageValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const passwordsAreEqual = useMemo(
    () => password === password2 && password && password2,
    [password, password2]
  );

  const passwordHasFormat = useMemo(
    () => password.length > 6 && password.length < 12,
    [password]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (isFormValid && passwordsAreEqual && passwordHasFormat) {
      setUsers((prevState) => [
        ...prevState,
        { user, email, city, state, gender, age },
      ]);
    }
  };

  return (
    <form aria-label="submit-form" onSubmit={handleSubmit} className="form">
      <label htmlFor="user">Usuario</label>
      <Input
        id="user"
        placeholder="Escribe tu nombre de usuario"
        name="user"
        value={user}
        onChange={onInputChange}
        hasSubmitted={hasSubmitted}
        error={userValid}
      />
      <label htmlFor="password">Contraseña</label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Escribe tu contraseña"
        hasSubmitted={hasSubmitted}
        error={
          passwordHasFormat
            ? ""
            : "El minimo requerido es de 6 letras y el maximo de 12"
        }
        value={password}
        onChange={onInputChange}
      />

      <label htmlFor="password2">Confirmar contraseña</label>
      <Input
        type="password"
        id="password2"
        name="password2"
        placeholder="Confirma tu contraseña"
        hasSubmitted={hasSubmitted}
        error={passwordsAreEqual ? "" : "Las contraseñas no coinciden"}
        value={password2}
        onChange={onInputChange}
      />

      <label htmlFor="email">Email</label>
      <Input
        id="email"
        placeholder="Escribe tu email"
        value={email}
        name="email"
        onChange={onInputChange}
        hasSubmitted={hasSubmitted}
        error={emailValid}
      />

      <div className="form__flex">
        <div className="form__row">
          <label htmlFor="gender">Genero</label>
          <select
            id="gender"
            name="gender"
            placeholder="Selecciona tu genero"
            value={gender}
            onChange={onInputChange}
            className="form__input"
          >
            <option disabled value={""}>
              Estado
            </option>
            <option value={"male"}>Hombre</option>
            <option value={"female"}>Mujer</option>
            <option value={"another"}>Otro</option>
          </select>
        </div>
        <div className="form__row">
          <label htmlFor="age">Edad</label>
          <Input
            id="age"
            type="number"
            placeholder="Escribe tu edad"
            name="age"
            value={age}
            onChange={onInputChange}
            hasSubmitted={hasSubmitted}
            error={ageValid}
          />
        </div>
      </div>

      <div className="form__flex">
        <div className="form__row">
          <label htmlFor="state">Estado</label>
          <select
            id="state"
            data-testid="state"
            name="state"
            placeholder="Selecciona tu estado"
            value={state}
            onChange={onInputChange}
            className="form__input"
          >
            <option disabled value={""}>
              Estado
            </option>
            {Object.entries(states).map(([key]) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="form__row">
          <label htmlFor="city">Ciudad</label>
          <select
            id="city"
            name="city"
            placeholder="Selecciona tu ciudad"
            value={city}
            onChange={onInputChange}
            className="form__input"
          >
            {state
              ? states[state as keyof typeof states].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
      <button className="form__button" type="submit">
        Submit
      </button>
    </form>
  );
};
