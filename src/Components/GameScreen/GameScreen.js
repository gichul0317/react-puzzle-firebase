import React, { useContext, useEffect, useState } from 'react';
import styles from './GameScreen.module.css';
import { puzzleData } from '../../puzzledata/puzzledata';
import { UserContext } from '../../store/user-context';

const shuffled = puzzleData
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

function GameScreen(props) {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  const ctx = useContext(UserContext);

  useEffect(() => {
    setStart(true);
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevState) => prevState + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);

  const puzzle = shuffled.map((item) => {
    return <li key={item.id}>{item.value}</li>;
  });

  return (
    <div className={styles.game}>
      <div className={styles.timer}>
        <span>{'Hurry, ' + ctx.name + ' '}</span>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{('0' + ((time / 10) % 1000)).slice(-2)}</span>
      </div>
      <ul className={styles.puzzle}>{puzzle}</ul>
    </div>
  );
}

export default GameScreen;
