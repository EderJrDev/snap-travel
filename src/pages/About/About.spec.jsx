import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";

describe(About.name, () => {
  it("should click in link", () => {
    const { getByText } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const linkElement = getByText("Criar registro");
    expect(linkElement).toBeTruthy();
  });
});
