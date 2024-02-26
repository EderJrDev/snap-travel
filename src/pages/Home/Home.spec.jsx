import { render } from "@testing-library/react";
import Home from "./Home";
import { beforeEach, expect, it, vi } from "vitest";

import * as router from "react-router";

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

it("should renders search input", () => {
  const { getByPlaceholderText } = render(<Home />);
  const inputElement = getByPlaceholderText("Ou busque por tags...");
  expect(inputElement).toBeTruthy();
});
