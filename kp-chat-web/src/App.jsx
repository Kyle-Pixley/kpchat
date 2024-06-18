import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard/Dashboard';


function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, []);

  //gives you a token to your browsers local storage
  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  };

  //handles what you see based on if you have a valid token in your local storage
  const handleView = () => {
    return !sessionToken 
      ? <Auth updateLocalStorage = {updateLocalStorage} /> 
      : <Dashboard sessionToken={sessionToken} />
  };

  //set to button when clicked sets token to undefined thus logging them out
  const logout = () => {
    localStorage.clear();
    setSessionToken(undefined);
  };

  return (
    <div id='app-container'>
      {handleView()}
      { sessionToken && <button id='logout' onClick={logout}>Logout</button>}
    </div>
  )
}

export default App;