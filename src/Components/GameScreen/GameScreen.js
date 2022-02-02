import React from 'react';
import styles from './GameScreen.module.css';
import { puzzleData } from '../../puzzledata/puzzledata';

const puzzle = puzzleData.map((item) => {
  return <li key={item.id}>{item.value}</li>;
});

function GameScreen(props) {
  return (
    <div className={styles.game}>
      <div className={styles.timer}>timer here</div>
      <ul className={styles.puzzle}>{puzzle}</ul>
    </div>
  );
}

export default GameScreen;
