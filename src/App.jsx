import React, { useState } from 'react';
import './App.css';
import { UserContext } from './store/user-context';
import StartScreen from './Components/StartScreen/StartScreen';

function App() {
  const [userInfo, setUserInfo] = useState([]);

  const handleUserInfo = (info) => {
    setUserInfo(info);
  };

  return (
    <UserContext.Provider value={userInfo}>
      <main className="App">
        <StartScreen onSubmitted={handleUserInfo} />
      </main>
    </UserContext.Provider>
  );
}

export default App;
