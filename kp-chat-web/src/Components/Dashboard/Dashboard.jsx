import React, { useState } from 'react';
import Rooms from './Rooms/Rooms.jsx';
import CreateRoom from './CreateRoom/CreateRoom.jsx';
import './Dashboard.css';

function Dashboard({ sessionToken }) {

  const [ isOpen, setIsOpen ] = useState(false);

  const displayCreateForm = () => {
    if(isOpen) {
      return (
        <>
          <button onClick={e => setIsOpen(false)}>Close</button>
          <CreateRoom sessionToken={sessionToken} />
        </>
      )
    } else {
      return <Rooms sessionToken={sessionToken} isOpen={isOpen} setIsOpen={setIsOpen} />
    }
  }

  return (
    <div id='dashboard'>
      <div>
        {displayCreateForm()}
      </div>
    </div>
  )
}

export default Dashboard;