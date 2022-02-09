import React, { useContext, useState } from 'react';
import { UserContext } from '../../store/user-context';
import styles from './EndScreen.module.css';
import StartScreen from '../StartScreen/StartScreen';

function EndScreen(props) {
  const [playAgain, setPlayAgain] = useState(false);

  const ctx = useContext(UserContext);

  const userData = [...props.userData];
  const userList = userData.sort((a, b) =>
    a.cleartime > b.cleartime ? 1 : b.cleartime > a.cleartime ? -1 : 0
  );

  let content = (
    <div className={styles.end}>
      <div className={styles.user}>
        <span>{ctx.name}, check your score</span>
      </div>
      <ul className={styles.userlist}>
        {userList.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.name + ' '}: </span>
              <span>{item.cleartime}</span>
            </li>
          );
        })}
      </ul>
      <div className={styles.btnbox}>
        <button onClick={() => setPlayAgain(true)}>Play Again</button>
      </div>
    </div>
  );

  if (playAgain === true) {
    content = <StartScreen />;
  }

  return content;
}

export default EndScreen;
