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
  const [puzzle, setPuzzle] = useState([...shuffled]);
  const [color, setColor] = useState({});
  const [element, setElement] = useState({ id: '', key: '' });

  const ctx = useContext(UserContext);

  useEffect(() => {
    if (puzzle.length === 0) {
      setStart(false);
    } else {
      setStart(true);
    }
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevState) => prevState + 10);
      }, 10);
    } else if (!start) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start, puzzle.length]);

  const colorHandler = (id) => {
    setColor(() => {
      const init = { ...color };
      init.id = id;
      return init;
    });
  };

  const filterHandler = (key, id) => {
    if (element.key === key && element.id !== id) {
      const updated = puzzle.filter((item) => item.key !== key);
      setPuzzle(updated);
      setElement({ key, id });
      console.log(element.key, element.id);
    } else {
      setElement({ key, id });
      console.log(element.key, element.id);
    }
  };

  return (
    <div className={styles.game}>
      <div className={styles.timer}>
        <span>{'Hurry, ' + ctx.name + ' '}</span>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{('0' + ((time / 10) % 1000)).slice(-2)}</span>
      </div>
      <ul className={styles.puzzle}>
        {puzzle.map((item, i) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                colorHandler(item.id);
                filterHandler(item.key, item.id);
              }}
              style={{ backgroundColor: color.id === item.id ? 'white' : null }}
            >
              {item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GameScreen;
