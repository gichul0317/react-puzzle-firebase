# HTML Puzzle Game

A React puzzle game for matching pairs of semantic HTML tags. Players enter a name, start the game, and match opening and closing tag cards such as `<main>` and `</main>`.

Live page: https://gichul0317.github.io/react-puzzle-firebase/

## Features

- Starts a new game after the player enters a name
- Randomizes puzzle card positions on each game
- Reveals matched tag values before removing the cards
- Keeps removed card slots in place so the grid does not shift
- Saves scores to Firebase Realtime Database only after the game is completed
- Shows completed scores from the start screen with `See Scores`
- Returns to the start screen with `Play Again`

## Tech Stack

- React 17
- Vite
- Vitest
- Firebase Realtime Database
- GitHub Pages
