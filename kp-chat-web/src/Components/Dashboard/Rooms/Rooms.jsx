import React, { useState, useEffect } from 'react';
import './Rooms.css';

function Rooms({ sessionToken, isOpen, setIsOpen, setSelectedRoom, isDesktop, roomListOpen, setRoomListOpen }) {

  const [ allRooms, setAllRooms ] = useState([]);;

  useEffect(() => {
    if (allRooms.length !== 0) return

    const options = {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken
      })
    }

    fetch(`http://10.0.0.23:8081/rooms/`, options)
      .then(res => res.json())
      .then(data => setAllRooms(data.allRooms));
  },[]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room)
  }

// button to toggle list of rooms only available when screen width is less than 700 pixels 
  const displayRoomListButton = () => {
    if(!isDesktop && roomListOpen) {
      return ( <button style={{backgroundColor: '#278e90'}}id='room-list-button' onClick={() => setRoomListOpen(!roomListOpen)}>Rooms</button> )
    } else null
  };

  return (
    <div id='rooms-container'>
      {displayRoomListButton()}
        <button id='create-room-button' onClick={() => setIsOpen(!isOpen)}>Create New Room</button>
      <div id='rooms-list-parent'>
          { allRooms && allRooms.length !== 0 
            ? allRooms.map((room, i) =>
              <p className='room-name' key={i} onClick={() => handleRoomClick(room)}>
                {room.name}
              </p>
            )
            : <h1>Loading</h1>
          }
      </div>
    </div>
  );
}

export default Rooms;