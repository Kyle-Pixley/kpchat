import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {

  const [ isDesktop, setIsDesktop ] = useState(window.innerWidth >= 700);
  const [ sessionToken, setSessionToken ] = useState(undefined);
  const [ socket, setSocket ] = useState(null);

  //looks to see if the user is on a device that is less than or more than 700px wide
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 700px)');

    const handleMediaQueryChange = e => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, []);

  useEffect(() => {
    if(sessionToken) {
      const ws = new WebSocket('ws://10.0.0.23:8081');

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [ sessionToken ]);

  //gives you a token to your browsers local storage
  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  };

  //handles what you see based on if you have a valid token in your local storage
  const handleView = () => {
    return !sessionToken 
      ? <Auth 
          updateLocalStorage={updateLocalStorage} /> 
      : <Dashboard 
          sessionToken={sessionToken} 
          socket={socket} 
          isDesktop={isDesktop} />
  };

  //set to button when clicked sets token to undefined thus logging them out
  const logout = () => {
    localStorage.clear();
    setSessionToken(undefined);
    if(socket) {
      socket.close();
    }
  };

  return (
    <div id='app-container'>
      { sessionToken && <button id='logout' onClick={logout}>Logout</button>}
      {handleView()}
    </div>
  )
}

export default App;