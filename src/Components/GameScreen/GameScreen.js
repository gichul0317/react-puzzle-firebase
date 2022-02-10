import React, { useContext, useEffect, useState } from 'react';
import styles from './GameScreen.module.css';
import { puzzleData } from '../../puzzledata/puzzledata';
import { UserContext } from '../../store/user-context';
import { getDatabase, ref, update } from 'firebase/database';
import firebase from '../../firebase';
import EndScreen from '../EndScreen/EndScreen';

// shuffle puzzledata array
const shuffled = puzzleData
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

function GameScreen(props) {
  // state for time
  const [time, setTime] = useState(0);
  // boolean state for time start
  const [start, setStart] = useState(false);
  // state for shuffled puzzledata
  const [puzzle, setPuzzle] = useState([...shuffled]);
  // state for css color change
  const [color, setColor] = useState({});
  // state for clicked element
  const [element, setElement] = useState({ id: '', key: '' });
  // state for open endscreen
  const [endgame, setEndGame] = useState(false);

  // usecontext
  const ctx = useContext(UserContext);

  // get childkey for firebase
  const data = [...props.userData];
  const newData = data.map((item) => item.id);
  const childKey = newData[newData.length - 1];

  // firebase
  const database = getDatabase(firebase);
  const dbRef = ref(database, `/${childKey}`);

  let fullTime = '';

  useEffect(() => {
    if (puzzle.length === 0) {
      setStart(false);
      update(dbRef, { cleartime: fullTime });
      setEndGame(true);
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
  }, [start, puzzle.length, fullTime, dbRef]);

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
    } else {
      setElement({ key, id });
    }
  };

  fullTime = `${('0' + Math.floor((time / 60000) % 60)).slice(-2)}:${(
    '0' + Math.floor((time / 1000) % 60)
  ).slice(-2)}:${('0' + ((time / 10) % 1000)).slice(-2)}`;

  let content = (
    <div className={styles.game}>
      <div className={styles.timer}>
        <span>{'Hurry, ' + ctx.name + ' '}</span>
        <span>{fullTime}</span>
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

  if (endgame === true) {
    content = <EndScreen userData={props.userData} />;
  }

  return content;
}

export default GameScreen;
