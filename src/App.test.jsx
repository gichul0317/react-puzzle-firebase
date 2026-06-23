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

vi.mock('./usematchmedia/usematchmedia', () => ({
  useMatchMedia: vi.fn(() => false),
}));

test('renders the small screen fallback in the test viewport', () => {
  render(<App />);
  const message = screen.getByText(/mobile or small screen not available/i);
  expect(message).toBeInTheDocument();
});
