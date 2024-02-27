import { render } from "@testing-library/react";
import Home from "./Home";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as router from "react-router";
import * as useFetchDocumentsModule from '../../hooks/useFetchDocuments';

describe('Home', () => {

  const navigate = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("should renders search input", () => {
    const { getByPlaceholderText } = render(<Home />);
    const inputElement = getByPlaceholderText("Ou busque por tags...");
    expect(inputElement).toBeTruthy();
  });
})

let navigateMock;

beforeEach(() => {
  navigateMock = vi.fn();
  vi.spyOn(router, 'useNavigate').mockReturnValue(navigateMock);
});

// it('should search when click on button', () => {
//   const documents = [{ id: 1, title: 'Document 1' }, { id: 2, title: 'Document 2' }];
//   vi.spyOn(useFetchDocumentsModule, 'useFetchDocuments').mockReturnValue({ documents });

//   const { getByText, toHaveBeenCalledWith } = render(<Home />);

//   const btnSearch = screen.getByText('Pesquisar');
//   fireEvent.click(btnSearch);

//   expect(navigateMock).toHaveBeenCalledWith('/search?q=');
// });
