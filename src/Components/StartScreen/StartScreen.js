import React, { useEffect, useState } from 'react';
import styles from './StartScreen.module.css';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from '../../firebase';

function StartScreen(props) {
  const [test, setTest] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (res) => {
      console.log(res.val());
      const newArr = [];
      const data = res.val();
      for (let key in data) {
        newArr.push({ key: data[key], name: data[key], time: 123 });
      }
      setTest(newArr);
    });
  }, []);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, input);
    setInput('');
  };

  const testArr = test.map((item) => {
    console.log(item);
  });

  return (
    <div className={styles.start}>
      <h1>Let's build html puzzle game with react</h1>
      <form action="submit" onSubmit={submitHandler}>
        <label htmlFor="test">Add test value</label>
        <input type="text" id="test" onChange={inputHandler} value={input} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default StartScreen;
