import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import EditPost from './EditPost';
import { describe, it, vi } from 'vitest';

// Mockando useAuthValue
vi.mock('../../context/AuthContext', () => ({
  useAuthValue: vi.fn(() => ({ user: { uid: 'mockedUid', displayName: 'mockedUser' } }))
}));

// Mockando useFetchDocument e useUpdateDocument
vi.mock('../../hooks/useFetchDocument', () => ({
  useFetchDocument: vi.fn(() => ({ document: { id: 1, title: 'Test Post', image: 'https://example.com/image.jpg', body: 'Test body', tagsArray: ['tag1', 'tag2'] } }))
}));

vi.mock('../../hooks/useUpdateDocument', () => ({
  useUpdateDocument: vi.fn(() => ({ updateDocument: vi.fn(), response: {} }))
}));

describe('EditPost component', () => {
  it('renders component correctly', async () => {
    const { getByText, getByLabelText, getByAltText } = render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <EditPost />
      </MemoryRouter>
    );

    expect(screen.getByText('Editando publicação: Test Post')).toBeTruthy();
    expect(screen.getByText('Altere os dados da publicação como desejar')).toBeTruthy();

    // Use getByLabelText para encontrar o campo de título
    expect(screen.getByLabelText('Titulo')).toBeTruthy();

    // Verifica se os valores dos campos são preenchidos corretamente
    expect(screen.getByLabelText('Titulo').value).toBe('Test Post');
    expect(screen.getByLabelText('URL da imagem').value).toBe('https://example.com/image.jpg');

    // Verifica se a imagem está sendo renderizada corretamente
    expect(screen.getByAltText('Test Post')).toBeTruthy();

    // Verifica se os valores dos campos são preenchidos corretamente
    expect(getByLabelText('Titulo').value).toBe('Test Post');
    expect(getByLabelText('URL da imagem').value).toBe('https://example.com/image.jpg');

    // Verifica se a imagem está sendo renderizada corretamente
    expect(getByAltText('Test Post')).toBeTruthy();
  });

  it('submits form with valid data', async () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <EditPost />
      </MemoryRouter>
    );

    // Simula a edição de campos
    fireEvent.change(getByLabelText('Titulo'), { target: { value: 'Updated Test Post' } });
    fireEvent.change(getByLabelText('URL da imagem'), { target: { value: 'https://example.com/updated-image.jpg' } });

    fireEvent.click(getByText('Editar'));

    // expect(getByText('Aguarde...')).toBeTruthy();


    // Adicione asserções para verificar o comportamento após a submissão
  });
});
