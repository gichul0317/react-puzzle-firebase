import React, { useContext } from 'react';
import styles from './EndScreen.module.css';
import { UserContext } from '../../store/user-context';

function EndScreen(props) {
  // usecontext
  const ctx = useContext(UserContext);
  const playerName = ctx && ctx.name ? ctx.name.trim() : '';
  const storedUserData = props.userData || [];

  // sort players data by cleartime
  const hasCurrentScore =
    props.currentScore &&
    !storedUserData.some(
      (item) =>
        item.name === props.currentScore.name &&
        item.cleartime === props.currentScore.cleartime
    );
  const mergedUserData = hasCurrentScore
    ? [...storedUserData, props.currentScore]
    : storedUserData;
  const userData = [...mergedUserData].filter((item) => item.cleartime !== '');
  const userList = userData.sort((a, b) =>
    a.cleartime > b.cleartime ? 1 : b.cleartime > a.cleartime ? -1 : 0
  );

  return (
    <div className={styles.end}>
      <div className={styles.user}>
        <p>{playerName ? `${playerName}, thanks for playing` : 'Score Board'}</p>
        <p>{playerName ? 'check your score' : 'check the scores'}</p>
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
        <button
          type="button"
          className={styles.button}
          onClick={props.onPlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
