import React, { useContext } from 'react';
import { UserContext } from '../../store/user-context';
import styles from './EndScreen.module.css';

function EndScreen(props) {
  const ctx = useContext(UserContext);

  const userData = [...props.userData];
  const userList = userData.sort((a, b) =>
    a.cleartime > b.cleartime ? 1 : b.cleartime > a.cleartime ? -1 : 0
  );
  console.log(userData);
  console.log(userList);

  return (
    <div className={styles.end}>
      <div className={styles.user}>
        <h1>{ctx.name}</h1>
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
      <button>Play Again</button>
    </div>
  );
}

export default EndScreen;
