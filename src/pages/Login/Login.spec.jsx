import { fireEvent, render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { useAuthentication } from "../../hooks/useAuthentication";
import Login from "./Login";

describe("Login Component", () => {
  it("renders login form correctly", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<Login />);

    const button = getByRole("button", { name: "Entrar" });
    expect(button).toBeTruthy();

    expect(
      getByText("Faça o login para poder utilizar o sistema")
    ).toBeTruthy();
    expect(getByPlaceholderText("E-mail do usuário")).toBeTruthy();
    expect(getByPlaceholderText("Insira sua senha")).toBeTruthy();
  });

  it("allows users to input email and password", () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText("E-mail do usuário");
    const passwordInput = getByPlaceholderText("Insira sua senha");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");

    expect(emailInput).toBeTruthy("test@example.com");
    expect(passwordInput).toBeTruthy("password123");
  });

  // Mock do hook useAuthentication()
  vi.mock("./useAuthentication");

  it("displays loading state when submitting form", async () => {
    const mockUseAuthentication = vi.fn();
    mockUseAuthentication.mockReturnValue({
      login: vi.fn(),
      error: null,
      loading: false,
    });

    // Renderize o hook dentro de um teste
    const { result } = renderHook(() => useAuthentication());

    // Acesse os valores retornados pelo hook
    const { login, error, loading } = result.current;

    // Asserções para verificar se os valores estão corretos
    expect(error).toBe(null);
    expect(loading).toBe(null);

    const { getByPlaceholderText, getByRole } = render(<Login />);
    const emailInput = getByPlaceholderText("E-mail do usuário");
    const passwordInput = getByPlaceholderText("Insira sua senha");
    const submitButton = getByRole("button", { name: "Entrar" });

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");

    fireEvent.click(submitButton);

    expect(submitButton).toBeTruthy();
  });
});
