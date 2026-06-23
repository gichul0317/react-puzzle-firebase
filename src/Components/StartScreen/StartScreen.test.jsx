import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { push } from 'firebase/database';
import StartScreen from './StartScreen';

vi.mock('firebase/database', () => {
  const rootRef = { path: '/' };

  return {
    getDatabase: vi.fn(() => ({})),
    ref: vi.fn(() => rootRef),
    onValue: vi.fn((dbRef, callback) => {
      callback({
        val: () => ({
          'player-1': { name: 'Ada', cleartime: '' },
          'player-2': { name: 'Grace', cleartime: '00:00:42' },
        }),
      });
    }),
    push: vi.fn(),
  };
});

vi.mock('../../firebase', () => ({
  default: {},
}));

vi.mock('../GameScreen/GameScreen', () => ({
  default: function MockGameScreen(props) {
    return (
      <div>
        <p>Game Screen</p>
        <button type="button" onClick={props.onPlayAgain}>
          Play Again
        </button>
      </div>
    );
  },
}));

test('returns to the start screen when play again is selected after a game', () => {
  render(<StartScreen onSubmitted={vi.fn()} />);

  fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
    target: { value: 'Ada' },
  });
  fireEvent.click(screen.getByRole('button', { name: /start game/i }));

  expect(screen.getByText(/game screen/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /play again/i }));

  expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
});

test('does not save a player score when the game starts', () => {
  render(<StartScreen onSubmitted={vi.fn()} />);

  fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
    target: { value: 'Ada' },
  });
  fireEvent.click(screen.getByRole('button', { name: /start game/i }));

  expect(push).not.toHaveBeenCalled();
});

test('shows completed scores from the start screen', () => {
  render(<StartScreen onSubmitted={vi.fn()} />);

  fireEvent.click(screen.getByRole('button', { name: /see scores/i }));

  expect(screen.getByText(/score board/i)).toBeInTheDocument();
  expect(screen.getByText('00:00:42')).toBeInTheDocument();
  expect(screen.queryByText('Ada')).not.toBeInTheDocument();
});
