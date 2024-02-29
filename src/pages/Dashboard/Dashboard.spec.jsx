import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';
import { it, vi } from 'vitest';

// Mockando useAuthValue
vi.mock('../../context/AuthContext', () => ({
  useAuthValue: vi.fn(() => ({ user: { uid: 'mockedUid' } }))
}));

// Mockando useFetchDocuments e useDeleteDocument
vi.mock('../../hooks/useFetchDocuments', () => ({
  useFetchDocuments: vi.fn(() => ({ documents: [{ id: 1, title: 'Test Post' }], loading: false }))
}));

vi.mock('../../hooks/useDeleteDocuments', () => ({
  useDeleteDocument: vi.fn(() => ({ deleteDocument: vi.fn() }))
}));

describe('Dashboard component', () => {
  it('renders component correctly', async () => {
    const { getByText } = render(
      <Router>
        <Dashboard />
      </Router>
    );

    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Gerencie os seus registros')).toBeTruthy();
    // expect(getByText('Título')).toBeTruthy();
    // expect(getByText('Ações')).toBeTruthy();

    // Verifica se os posts foram carregados e exibidos corretamente
    // await waitFor(() => {
    //   expect(getByText('Test Post')).toBeTruthy();
    // });
  });

  it('displays "Criar primeiro post" when no posts are available', async () => {
    // Mockando useFetchDocuments para retornar uma lista vazia de posts
    vi.mock('../../hooks/useFetchDocuments', () => ({
      useFetchDocuments: vi.fn(() => ({ documents: [], loading: false }))
    }));

    const { getByText } = render(
      <Router>
        <Dashboard />
      </Router>
    );

    expect(getByText('Não foram encontrados posts')).toBeTruthy();
    expect(getByText('Criar primeiro post')).toBeTruthy();
  });

});
