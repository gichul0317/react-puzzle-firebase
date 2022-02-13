import React, { useContext } from 'react';
import styles from './EndScreen.module.css';
import { UserContext } from '../../store/user-context';

function EndScreen(props) {
  // usecontext
  const ctx = useContext(UserContext);

  // sort players data by cleartime
  const userData = [...props.userData].filter((item) => item.cleartime !== '');
  const userList = userData.sort((a, b) =>
    a.cleartime > b.cleartime ? 1 : b.cleartime > a.cleartime ? -1 : 0
  );

  return (
    <div className={styles.end}>
      <div className={styles.user}>
        <p>{ctx.name}, thanks for playing</p>
        <p>check your score</p>
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
    </div>
  );
}

export default EndScreen;
