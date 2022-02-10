import React, { useState } from 'react';
import './App.css';
import { UserContext } from './store/user-context';
import { useMatchMedia } from './usematchmedia/usematchmedia';
import StartScreen from './Components/StartScreen/StartScreen';
import MobileScreen from './Components/MobileScreen/MobileScreen';

function App() {
  const [userInfo, setUserInfo] = useState([]);

  const handleUserInfo = (info) => {
    setUserInfo(info);
  };

  const isDesktop = useMatchMedia('(min-width:800px)', true);

  return (
    <UserContext.Provider value={userInfo}>
      <main className="App">
        {isDesktop && <StartScreen onSubmitted={handleUserInfo} />}
        {!isDesktop && <MobileScreen />}
      </main>
    </UserContext.Provider>
  );
}

export default App;
