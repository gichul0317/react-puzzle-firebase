import React, { useState } from 'react';
import './App.css';
import { UserContext } from './store/user-context';
import { useMatchMedia } from './usematchmedia/usematchmedia';
import StartScreen from './Components/StartScreen/StartScreen';
import MobileScreen from './Components/MobileScreen/MobileScreen';

function App() {
  // state for usercontext
  const [userInfo, setUserInfo] = useState([]);

  const handleUserInfo = (info) => {
    setUserInfo(info);
  };

  // calculate screen width and height
  const isDesktopWidth = useMatchMedia('(min-width:800px)', true);
  const isDesktopHeight = useMatchMedia('(min-height:800px)', true);

  return (
    <UserContext.Provider value={userInfo}>
      <main className="App">
        {isDesktopWidth && isDesktopHeight && (
          <StartScreen onSubmitted={handleUserInfo} />
        )}
        {(!isDesktopWidth || !isDesktopHeight) && <MobileScreen />}
      </main>
    </UserContext.Provider>
  );
}

export default App;
