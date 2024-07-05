import React, { useState, useEffect, useRef } from 'react';
import './Rooms.css';
import CreateMessage from '../CreateMessage/CreateMessage.jsx';
import Message from '../Message/Message.jsx';

function Rooms({ sessionToken, isOpen, setIsOpen, socket, selectedRoom, setSelectedRoom, roomMessages, setRoomMessages, isDesktop, roomListOpen, setRoomListOpen }) {

  const [ allRooms, setAllRooms ] = useState([]);;
  const roomMessageRef = useRef(null);
  

  function getAllMessages() {
    
    if(!selectedRoom) return;

    const options = {
      method: 'GET',
      headers: new Headers({
        authorization: sessionToken,
      }),
    };

    fetch(`http://10.0.0.23:8081/message/${selectedRoom._id}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.allMessages)) {
          setRoomMessages(data.allMessages)
        } else {
          setRoomMessages([]);
        }
      });
  };

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
  });

  useEffect(() => {
    getAllMessages();
  }, [selectedRoom, sessionToken])

  useEffect(() => {
    if (roomMessageRef.current) {
      roomMessageRef.current.scrollTo(0, roomMessageRef.current.scrollHeight)
    }
  }, [roomMessages])

  // const handleMessageCreated = (newMessage) => {
  //   setRoomMessages([...roomMessages, newMessage])
  // }

  const handleRoomClick = (room) => {
    setSelectedRoom(room)
  }

  const displayRoomListButton = () => {
    if(!isDesktop && roomListOpen) {
      return ( <button id='room-list-button' onClick={() => setRoomListOpen(!roomListOpen)}>Rooms</button> )
    } else null
  }

  return (
    <div id='rooms-container'>
      {displayRoomListButton()}
        <button id='create-room-button' onClick={() => setIsOpen(!isOpen)}>Create New Room</button>
      <div id='rooms-list-parent'>
        <div id='room-list'>
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
      {selectedRoom && (
        <div id='selected-room-parent'>
          <h2 id='selected-room-title'>{selectedRoom.name}</h2>
          <div id='room-messages' ref={roomMessageRef}>
            { roomMessages.map((message, i) => {
              return <Message
                  key={i}
                  message={message}
                  sessionToken={sessionToken}
                  getAllMessages={getAllMessages}
                  roomMessages={roomMessages}
                  />
            })}
          </div>
          <CreateMessage 
            sessionToken={sessionToken}
            selectedRoom={selectedRoom}
            socket={socket}
          />
        </div>
      )}
    </div>
  );
}

export default Rooms;