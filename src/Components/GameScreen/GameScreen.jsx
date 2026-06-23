import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './GameScreen.module.css';
import { puzzleData } from '../../puzzledata/puzzledata';
import { UserContext } from '../../store/user-context';
import { getDatabase, push, ref } from 'firebase/database';
import firebase from '../../firebase';
import EndScreen from '../EndScreen/EndScreen';

export const createShuffledPuzzle = (puzzle = puzzleData, random = Math.random) =>
  puzzle
    .map((value) => ({ value: { ...value, status: 'hidden' }, sort: random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const MATCH_REVEAL_MS = 600;
const MISMATCH_REVEAL_MS = 700;

function GameScreen(props) {
  // state for time
  const [time, setTime] = useState(0);
  // state for shuffled puzzledata
  const [puzzle, setPuzzle] = useState(() => createShuffledPuzzle());
  // state for selected puzzle card
  const [selectedCard, setSelectedCard] = useState(null);
  // state for waiting on match/mismatch animation
  const [isResolving, setIsResolving] = useState(false);
  // state for open endscreen
  const [endgame, setEndGame] = useState(false);
  const [completedScore, setCompletedScore] = useState(null);
  const timeoutIds = useRef([]);
  const scoreSaved = useRef(false);

  // usecontext
  const ctx = useContext(UserContext);

  // firebase
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  const fullTime = `${('0' + Math.floor((time / 60000) % 60)).slice(-2)}:${(
    '0' + Math.floor((time / 1000) % 60)
  ).slice(-2)}:${('0' + ((time / 10) % 1000)).slice(-2)}`;

  useEffect(() => {
    if (endgame) {
      return;
    }
    const interval = setInterval(() => {
      setTime((prevState) => prevState + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [endgame]);

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    const isComplete = puzzle.every((item) => item.status === 'removed');
    if (isComplete && !scoreSaved.current) {
      const score = { name: ctx.name, cleartime: fullTime };
      scoreSaved.current = true;
      setCompletedScore({ id: 'current-score', ...score });
      push(dbRef, score);
      setEndGame(true);
    }
  }, [ctx.name, dbRef, fullTime, puzzle]);

  const schedulePuzzleUpdate = (callback, delay) => {
    const timeoutId = setTimeout(() => {
      callback();
      timeoutIds.current = timeoutIds.current.filter((id) => id !== timeoutId);
    }, delay);
    timeoutIds.current.push(timeoutId);
  };

  const updateCardsById = (ids, status) => {
    setPuzzle((prevPuzzle) =>
      prevPuzzle.map((item) =>
        ids.includes(item.id) ? { ...item, status } : item
      )
    );
  };

  const cardClickHandler = (clickedCard) => {
    if (
      isResolving ||
      clickedCard.status === 'matched' ||
      clickedCard.status === 'removed'
    ) {
      return;
    }

    if (clickedCard.status === 'selected') {
      return;
    }

    if (!selectedCard) {
      updateCardsById([clickedCard.id], 'selected');
      setSelectedCard(clickedCard);
      return;
    }

    const selectedIds = [selectedCard.id, clickedCard.id];
    setIsResolving(true);
    setSelectedCard(null);

    if (selectedCard.key === clickedCard.key) {
      updateCardsById(selectedIds, 'matched');
      schedulePuzzleUpdate(() => {
        updateCardsById(selectedIds, 'removed');
        setIsResolving(false);
      }, MATCH_REVEAL_MS);
      return;
    }

    updateCardsById(selectedIds, 'selected');
    schedulePuzzleUpdate(() => {
      updateCardsById(selectedIds, 'hidden');
      setIsResolving(false);
    }, MISMATCH_REVEAL_MS);
  };

  const getCardClassName = (status) => {
    if (status === 'selected') {
      return styles.selected;
    }
    if (status === 'matched') {
      return styles.matched;
    }
    if (status === 'removed') {
      return styles.removed;
    }
    return '';
  };

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
              className={getCardClassName(item.status)}
              onClick={() => cardClickHandler(item)}
            >
              {item.status === 'removed' ? '' : item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (endgame === true) {
    content = (
      <EndScreen
        userData={props.userData}
        currentScore={completedScore}
        onPlayAgain={props.onPlayAgain}
      />
    );
  }

  return content;
}

export default GameScreen;
