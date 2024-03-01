import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as router from "react-router";
import Home from "./Home";

describe("Home", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("should renders search input", () => {
    const { getByPlaceholderText } = render(<Home />);
    const inputElement = getByPlaceholderText("Ou busque por tags...");
    expect(inputElement).toBeTruthy();
  });
});

let navigateMock;

beforeEach(() => {
  navigateMock = vi.fn();
  vi.spyOn(router, "useNavigate").mockReturnValue(navigateMock);
});
