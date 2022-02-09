import React, { useEffect, useState } from 'react';
import styles from './StartScreen.module.css';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from '../../firebase';
import GameScreen from '../GameScreen/GameScreen';

function StartScreen(props) {
  // user information in firebase
  const [userInfo, setUserInfo] = useState([]);
  // user name input in the form
  const [userName, setUserName] = useState('');
  // check login staus
  const [login, SetLogin] = useState();

  const database = getDatabase(firebase);
  // const dbRef = ref(database, `/${userName.trim()}`);
  // for (let [key, val] of Object.entries(value)) {
  //   const { cleartime, name } = val;
  //   newArr.push({ id, key, cleartime, name });
  // }
  const dbRef = ref(database);

  useEffect(() => {
    onValue(dbRef, (res) => {
      const newArr = [];
      const data = res.val();
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
      SetLogin(false);
      alert('Please enter valid username');
      return;
    }
    push(dbRef, { name: userName.trim(), cleartime: '' });
    props.onSubmitted({ name: userName.trim() });
    SetLogin(true);
    setUserName('');
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
    </div>
  );

  if (login === true) {
    content = <GameScreen userData={userInfo} />;
  }

  return content;
}

export default StartScreen;
