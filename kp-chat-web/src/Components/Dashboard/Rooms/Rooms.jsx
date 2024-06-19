import React, { useState, useEffect, useRef } from 'react';
import './Rooms.css';
import CreateMessage from '../CreateMessage/CreateMessage.jsx';
import Message from '../Message/Message.jsx';

function Rooms({ sessionToken, isOpen, setIsOpen }) {

  const [ allRooms, setAllRooms ] = useState([]);
  const [ selectedRoom, setSelectedRoom ] = useState(null);
  const [ roomMessages, setRoomMessages ] = useState([]);
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
        console.log(data)
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

  const handleMessageCreated = (newMessage) => {
    setRoomMessages([...roomMessages, newMessage])
  }

  const handleRoomClick = (room) => {
    setSelectedRoom(room)
  }



  return (
    <div id='rooms-container'>
      <div id='room-list'>
        <button id='create-room-button' onClick={e => setIsOpen(!isOpen)}>Create New Room</button>
        { allRooms && allRooms.length !== 0 
          ? allRooms.map((room, i) =>
          <div id='room-list'>
            <p className='room-name' key={i} onClick={() => handleRoomClick(room)}>
              {room.name}
            </p>
          </div>
          )
          : <h1>Loading</h1>
        }
      </div>
      {selectedRoom && (
        <div id='selected-room-parent'>
          <h2 id='selected-room'>{selectedRoom.name}</h2>
          <div id='room-messages' ref={roomMessageRef}>
            { roomMessages.map((message, i) => {
              return <Message
                  key={i}
                  message={message}
                  sessionToken={sessionToken}
                  getAllMessages={getAllMessages}
                  />
            })}
          </div>
          <CreateMessage 
            sessionToken={sessionToken}
            selectedRoom={selectedRoom}
            messageCreated={handleMessageCreated}
          />
        </div>
      )}
    </div>
  );
}

export default Rooms;