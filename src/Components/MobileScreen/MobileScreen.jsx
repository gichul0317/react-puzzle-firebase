import React from 'react';
import styles from './MobileScreen.module.css';

function MobileScreen(props) {
  return (
    <div className={styles.mobile}>
      <p>Mobile or Small screen not available...</p>
      <p>Please start again...</p>
    </div>
  );
}

export default MobileScreen;
