import React, { useEffect, useState } from 'react';
import styles from './StartScreen.module.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../../firebase';
import GameScreen from '../GameScreen/GameScreen';
import EndScreen from '../EndScreen/EndScreen';

function StartScreen(props) {
  // user information in firebase
  const [userInfo, setUserInfo] = useState([]);
  // user name input in the form
  const [userName, setUserName] = useState('');
  // current screen state
  const [screenMode, setScreenMode] = useState('start');

  // firebase
  const database = getDatabase(firebase);
  // firebase
  const dbRef = ref(database);

  useEffect(() => {
    onValue(dbRef, (res) => {
      const newArr = [];
      const data = res.val() || {};
      for (let [id, value] of Object.entries(data)) {
        const { cleartime, name } = value;
        newArr.push({ id, cleartime, name });
      }
      setUserInfo(newArr);
    });
  }, [dbRef]);

  const inputHandler = (e) => {
    setUserName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userName.trim().length === 0) {
      alert('Please enter valid username');
      return;
    }
    props.onSubmitted({ name: userName.trim() });
    setScreenMode('game');
    setUserName('');
  };

  const playAgainHandler = () => {
    setScreenMode('start');
    props.onSubmitted({ name: '' });
  };

  const scoresHandler = () => {
    setScreenMode('scores');
    props.onSubmitted({ name: '' });
  };

  let content = (
    <div className={styles.start}>
      <h1>HTML Puzzle Game</h1>
      <form
        action="submit"
        onSubmit={submitHandler}
        className={styles['start__form']}
      >
        <label htmlFor="test" className="sr-only">
          Add test value
        </label>
        <input
          type="text"
          id="test"
          onChange={inputHandler}
          value={userName}
          placeholder="Enter Your Name"
        />
        <button className={styles.button}>Start Game</button>
      </form>
      <button
        type="button"
        className={`${styles.button} ${styles.scoreButton}`}
        onClick={scoresHandler}
      >
        See Scores
      </button>
    </div>
  );

  if (screenMode === 'game') {
    content = (
      <GameScreen userData={userInfo} onPlayAgain={playAgainHandler} />
    );
  }

  if (screenMode === 'scores') {
    content = <EndScreen userData={userInfo} onPlayAgain={playAgainHandler} />;
  }

  return content;
}

export default StartScreen;
