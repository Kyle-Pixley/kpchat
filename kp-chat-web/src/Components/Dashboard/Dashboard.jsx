import React, { useState, useEffect, useRef } from 'react';
import Rooms from './Rooms/Rooms.jsx';
import CreateRoom from './CreateRoom/CreateRoom.jsx';
import Message from '../Dashboard/Message/Message.jsx';
import CreateMessage from '../Dashboard/CreateMessage/CreateMessage.jsx';
import './Dashboard.css';

function Dashboard({ sessionToken, socket, isDesktop }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [ roomListOpen, setRoomListOpen ] = useState(false);
  const roomMessageRef = useRef(null);

  useEffect(() => {
    if (roomMessageRef.current) {
      roomMessageRef.current.scrollTo(0, roomMessageRef.current.scrollHeight)
    }
  }, [roomMessages])

  useEffect(() => {
    if (socket) {
      const handleMessage = (e) => {
        if (e.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const newMessage = JSON.parse(reader.result);
              setRoomMessages((prevMessages) => [...prevMessages, newMessage]);
            } catch (error) {
              console.error('Failed to parse WebSocket message:', reader.result, error);
            }
          };
          reader.onerror = (error) => {
            console.error('Failed to read Blob:', error);
          };
          reader.readAsText(e.data);
        } else {
          console.error('Unexpected non-Blob data:', e.data);
        }
      };

      socket.addEventListener('message', handleMessage);

      return () => {
        socket.removeEventListener('message', handleMessage);
      };
    }
  }, [socket]);

  const displayCreateForm = () => {
    if (isOpen) {
      return (
        <div>
          <button style={{backgroundColor:'#1f6f70'}}id='rooms-toggle-button' onClick={() => setIsOpen(false)}>Back</button>
          <CreateRoom sessionToken={sessionToken} />
        </div>
      );
    } else {
      return displayRoomList()
    }
  };

  useEffect(() => {
    getAllMessages();
  }, [selectedRoom, sessionToken])

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

  const displayRoomList = () => {
    if(isDesktop || (!isDesktop && roomListOpen)) {
      return (
          <Rooms
            sessionToken={sessionToken}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            socket={socket}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            messages={messages}
            setMessages={setMessages}
            roomMessages={roomMessages}
            setRoomMessages={setRoomMessages}
            roomListOpen={roomListOpen}
            setRoomListOpen={setRoomListOpen}
            isDesktop={isDesktop}
            /> 
        )
    } else {
      return (
        <button 
          id='room-list-button'
          onClick={() => setRoomListOpen(!roomListOpen)}>Rooms</button>
      )
    }
  };

  return (
    <div id='dashboard'>
        {displayCreateForm()}
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

export default Dashboard;