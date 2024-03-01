import { render, waitFor, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MemoryRouter } from "react-router-dom";
import Post from "./Post";

// Mockando useFetchDocument
vi.mock("../../hooks/useFetchDocument", () => ({
  useFetchDocument: vi.fn(() => ({
    document: {
      id: 1,
      title: "Test Post",
      image: "https://example.com/image.jpg",
      body: "Test body",
      tagsArray: ["tag1", "tag2"],
    },
    loading: false,
  })),
}));

describe("Post component", () => {
  it("renders component correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Post />
      </MemoryRouter>
    );

    // Verifica se o texto "Carregando post..." não está mais presente
    await waitFor(() => {
      expect(screen.queryByText("Carregando post...")).not.toBeTruthy();
    });

    // Verifica se os elementos do post estão sendo renderizados corretamente
    expect(screen.getByText("Test Post")).toBeTruthy();
    expect(screen.getByAltText("Test Post")).toBeTruthy();
    expect(screen.getByText("Test body")).toBeTruthy();
    expect(screen.getByText("Esse post trata sobre:")).toBeTruthy();

    // Obtém todos os elementos que contenham um texto começando com "# "
    const tags = screen.queryAllByText((content, element) => {
      return content.startsWith("# ");
    });

    expect(tags).toBeTruthy(2); // Verifica se foram encontrados dois elementos de tag
  });
});
