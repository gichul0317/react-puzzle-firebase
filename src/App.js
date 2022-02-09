import React, { useState } from 'react';
import './App.css';
import StartScreen from './Components/StartScreen/StartScreen';
import { UserContext } from './store/user-context';
import GameScreen from './Components/GameScreen/GameScreen';

function App() {
  const [userInfo, setUserInfo] = useState([]);

  const handleUserInfo = (info) => {
    setUserInfo(info);
  };

  return (
    <UserContext.Provider value={userInfo}>
      <main className="App">
        <StartScreen onSubmitted={handleUserInfo} />
        {/* <GameScreen /> */}
      </main>
    </UserContext.Provider>
  );
}

export default App;
