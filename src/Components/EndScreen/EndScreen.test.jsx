import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import EndScreen from './EndScreen';
import { UserContext } from '../../store/user-context';

function renderEndScreen(onPlayAgain = vi.fn()) {
  render(
    <UserContext.Provider value={{ name: 'Ada' }}>
      <EndScreen
        userData={[{ id: 'player-1', name: 'Ada', cleartime: '00:01:23' }]}
        onPlayAgain={onPlayAgain}
      />
    </UserContext.Provider>
  );

  return { onPlayAgain };
}

test('calls onPlayAgain when the play again button is clicked', () => {
  const { onPlayAgain } = renderEndScreen();

  fireEvent.click(screen.getByRole('button', { name: /play again/i }));

  expect(onPlayAgain).toHaveBeenCalledTimes(1);
});
