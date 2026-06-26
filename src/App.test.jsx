import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn((database, path = '') => ({ database, path })),
  onValue: vi.fn(),
  push: vi.fn(),
}));

vi.mock('./firebase', () => ({
  default: {},
}));

test('renders the game start screen in the small test viewport', () => {
  render(<App />);
  expect(
    screen.queryByText(/mobile or small screen not available/i)
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /html puzzle game/i })
  ).toBeInTheDocument();
});
