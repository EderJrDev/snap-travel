import { render, fireEvent, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import CreatePost from './CreatePost';

// Mockando useAuthValue
vi.mock('../../context/AuthContext', () => ({
  useAuthValue: vi.fn(() => ({ user: { uid: 'mockedUid', displayName: 'mockedUser' } }))
}));

// Mockando useInsertDocument e useNavigate
vi.mock('../../hooks/useInsertDocument', () => ({
  useInsertDocument: vi.fn(() => ({ insertDocument: vi.fn(), response: {} }))
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(() => vi.fn())
}));

describe('CreatePost component', () => {
  it('renders component correctly', () => {
    const { getByText } = render(<CreatePost />);

    expect(getByText('Criar Registro')).toBeTruthy();
    expect(getByText('Escreva sobre a sua experiência em sua viagem')).toBeTruthy();
  });

  it('submits form with valid data', async () => {
    const { getByText, getByLabelText } = render(<CreatePost />);

    fireEvent.change(getByLabelText('Local'), { target: { value: 'Test Place' } });
    fireEvent.change(getByLabelText('URL da imagem'), { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.change(getByLabelText('Conteúdo'), { target: { value: 'Test content' } });
    fireEvent.change(getByLabelText('Tags:'), { target: { value: 'tag1, tag2' } });

    expect(getByText('Cadastrar')).toBeTruthy()

    // Add assertions for expected behavior after submission
  });
});
