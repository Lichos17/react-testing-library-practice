import {
  render,
  screen,
  fireEvent,
  logRoles,
  waitFor,
} from "@testing-library/react";
import App from "../App";
import React from "react";

describe("Pruebas en <App />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should add user if form is correct", async () => {
    const formData = {
      user: "User",
      email: "test@test.com",
      gender: "male",
      age: 18,
      state: "Yucatan",
      city: "Merida",
      password: "test123",
      password2: "test123",
    };

    render(<App />);

    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const genderInput = screen.getByRole("combobox", { name: "Genero" });
    const cityInput = screen.getByRole("combobox", { name: "Ciudad" });

    const stateInput = screen.getByTestId("state");

    const ageInput = screen.getByRole("spinbutton", { name: "Edad" });
    const userInput = screen.getByRole("textbox", { name: "Usuario" });
    const passwordInput = screen.getByLabelText("Contraseña");
    const password2Input = screen.getByLabelText("Confirmar contraseña", {
      selector: "input",
    });
    const form = screen.getByLabelText("submit-form");

    fireEvent.change(emailInput, {
      target: { name: "email", value: formData.email },
    });
    fireEvent.change(genderInput, {
      target: { name: "gender", value: formData.gender },
    });
    fireEvent.change(stateInput, {
      target: { name: "state", value: "Yucatan" },
    });
    fireEvent.change(ageInput, {
      target: { name: "age", value: formData.age },
    });
    fireEvent.change(cityInput, {
      target: { name: "city", value: formData.city },
    });
    fireEvent.change(userInput, {
      target: { name: "user", value: formData.user },
    });
    fireEvent.change(passwordInput, {
      target: { name: "password", value: formData.password },
    });
    fireEvent.change(password2Input, {
      target: { name: "password2", value: formData.password2 },
    });

    fireEvent.submit(form);

    const users = screen.getAllByTestId("user-id");

    expect(users.length).toBe(1);
  });
});
