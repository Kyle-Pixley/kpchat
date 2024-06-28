import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard/Dashboard';

//todo Is it disconnecting randomly???


function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined);
  const [ socket, setSocket ] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, []);

  useEffect(() => {
    if(sessionToken) {
      const ws = new WebSocket('ws://10.0.0.23:8081');

      // ws.onopen = () => {
      //   console.log('WebSocket connection opened');
      //   ws.send(JSON.stringify({ type: 'authenticate', token: sessionToken}));
      // };

      // ws.onmessage = (e) => {
      //   if (e.data instanceof Blob) {
      //     const reader = new FileReader();
      //     reader.onload = () => {
      //       try {
      //         const message = JSON.parse(reader.result);
      //         console.log('Received message:', message);
      //       } catch (error) {
      //         console.error('Failed to parse WebSocket message:', reader.result, error);
      //       }
      //     };
      //     reader.onerror = (error) => {
      //       console.error('Failed to read Blob:', error);
      //     };
      //     reader.readAsText(e.data);
      //   } else {
      //     console.error('Unexpected non-Blob data:', e.data);
      //   }
      // };

      // ws.onclose = () => {
      //   console.log(' WebSocket connection closed');
      // };

      // ws.onerror = (err) => {
      //   console.error('WebSocket error', err);
      // };

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
      ? <Auth updateLocalStorage = {updateLocalStorage} /> 
      : <Dashboard sessionToken={sessionToken} socket={socket} />
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