import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "./Search";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { describe, expect, it, vi } from "vitest";

// Mock do hook useFetchDocuments
vi.mock("../../hooks/useFetchDocuments");

describe("Search component", () => {
  it("renders component correctly with search query", () => {
    // Mock do retorno de useFetchDocuments
    useFetchDocuments.mockReturnValue({
      documents: [
        {
          id: 1,
          title: "Test Post 1",
          image: "https://example.com/image1.jpg",
          body: "Test body 1",
          tagsArray: ["tag1"],
        },
        {
          id: 2,
          title: "Test Post 2",
          image: "https://example.com/image2.jpg",
          body: "Test body 2",
          tagsArray: ["tag2"],
        },
      ],
    });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    // Verifica se os elementos do componente estão presentes
    expect(screen.getByText("pesquisa:")).toBeTruthy();

    expect(screen.getByText("Test Post 1")).toBeTruthy();
    expect(screen.getByText("Test Post 2")).toBeTruthy();
  });

  it("renders component correctly with empty search result", () => {
    // Mock do retorno de useFetchDocuments
    useFetchDocuments.mockReturnValue({ documents: [] });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    // Verifica se os elementos do componente estão presentes
    expect(screen.getByText("pesquisa:")).toBeTruthy();

    expect(
      screen.getByText(/Não foram encontrados posts a partir da sua busca/i)
    ).toBeTruthy();
  });
});
