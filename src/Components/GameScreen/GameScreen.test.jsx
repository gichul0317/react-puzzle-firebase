import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import { push } from 'firebase/database';
import GameScreen, { createShuffledPuzzle } from './GameScreen';
import { UserContext } from '../../store/user-context';

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn((database, path = '') => ({ database, path })),
  push: vi.fn(() => Promise.resolve()),
}));

vi.mock('../../firebase', () => ({
  default: {},
}));

test('createShuffledPuzzle creates a fresh order from the current random values', () => {
  const puzzle = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const firstValues = [0.3, 0.1, 0.2];
  const secondValues = [0.1, 0.3, 0.2];

  const first = createShuffledPuzzle(puzzle, () => firstValues.shift());
  const second = createShuffledPuzzle(puzzle, () => secondValues.shift());

  expect(first.map((item) => item.id)).toEqual(['b', 'c', 'a']);
  expect(second.map((item) => item.id)).toEqual(['a', 'c', 'b']);
  expect(first).not.toBe(puzzle);
  expect(second).not.toBe(puzzle);
});

function renderGameScreen() {
  return render(
    <UserContext.Provider value={{ name: 'Ada' }}>
      <GameScreen
        userData={[{ id: 'player-1', name: 'Ada', cleartime: '' }]}
      />
    </UserContext.Provider>
  );
}

test('matched puzzle cards reveal before disappearing without shifting grid slots', () => {
  vi.useFakeTimers();

  renderGameScreen();

  const puzzleList = screen.getByRole('list');
  expect(within(puzzleList).getAllByRole('listitem')).toHaveLength(16);

  fireEvent.click(screen.getByText('<main>'));
  fireEvent.click(screen.getByText('</main>'));

  expect(screen.getByText('<main>')).toBeInTheDocument();
  expect(screen.getByText('</main>')).toBeInTheDocument();
  expect(within(puzzleList).getAllByRole('listitem')).toHaveLength(16);

  act(() => {
    vi.advanceTimersByTime(600);
  });

  expect(screen.queryByText('<main>')).not.toBeInTheDocument();
  expect(screen.queryByText('</main>')).not.toBeInTheDocument();
  expect(within(puzzleList).getAllByRole('listitem')).toHaveLength(16);

  vi.useRealTimers();
});

test('saves a new score only after every puzzle card is matched', async () => {
  vi.useFakeTimers();

  renderGameScreen();

  expect(push).not.toHaveBeenCalled();

  const tags = ['main', 'section', 'nav', 'footer', 'aside', 'h1', 'p', 'span'];

  for (const tag of tags) {
    fireEvent.click(screen.getByText(`<${tag}>`));
    fireEvent.click(screen.getByText(`</${tag}>`));

    act(() => {
      vi.advanceTimersByTime(600);
    });
  }

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith(expect.any(Object), {
    name: 'Ada',
    cleartime: expect.stringMatching(/^\d{2}:\d{2}:\d{2}$/),
  });

  vi.useRealTimers();
});
