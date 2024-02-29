import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Register from './Register';
import { useAuthentication } from '../../hooks/useAuthentication';
import { it, vi } from 'vitest';

// Mock do hook useAuthentication
vi.mock('../../hooks/useAuthentication');

describe('Register component', () => {
  it('renders component correctly', async () => {
    // Mock da função createUser
    const mockCreateUser = vi.fn();

    // Mock do retorno de useAuthentication
    useAuthentication.mockReturnValue({ createUser: mockCreateUser, loading: false, error: null });

    render(<Register />);

    // Verifica se os elementos do formulário estão presentes
    expect(screen.getByText('Cadastre-se para postar')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nome do usuário')).toBeTruthy();
    expect(screen.getByPlaceholderText('E-mail do usuário')).toBeTruthy();
    expect(screen.getByPlaceholderText('Insira sua senha')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirme a sua senha')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeTruthy();
  });

  it('submits form with valid data', async () => {
    const mockCreateUser = vi.fn().mockResolvedValue('User created successfully.');
    useAuthentication.mockReturnValue({ createUser: mockCreateUser, loading: false });

    render(<Register />);

    // Simula a entrada de dados nos campos do formulário
    fireEvent.change(screen.getByPlaceholderText('Nome do usuário'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('E-mail do usuário'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Insira sua senha'), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText('Confirme a sua senha'), { target: { value: 'password' } });

    // Simula o envio do formulário
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    // Aguarda até que a promessa retorne
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        displayName: 'Test User',
        email: 'test@example.com',
        password: 'password'
      });
    });

    // Verifica se a função createUser foi chamada corretamente
    expect(mockCreateUser).toHaveBeenCalled();
  });

  // Adicione mais testes para casos de campos vazios, senhas não coincidentes, etc.
});
