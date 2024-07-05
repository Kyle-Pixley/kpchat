import React, { useState, useEffect } from 'react';
import Rooms from './Rooms/Rooms.jsx';
import CreateRoom from './CreateRoom/CreateRoom.jsx';
import './Dashboard.css';

function Dashboard({ sessionToken, socket, isDesktop }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [ roomListOpen, setRoomListOpen ] = useState(false);

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
        <>
          <button onClick={() => setIsOpen(false)}>Close</button>
          <CreateRoom sessionToken={sessionToken} />
        </>
      );
    } else {
      return displayRoomList()
      //   <Rooms
      //     sessionToken={sessionToken}
      //     isOpen={isOpen}
      //     setIsOpen={setIsOpen}
      //     socket={socket}
      //     selectedRoom={selectedRoom}
      //     setSelectedRoom={setSelectedRoom}
      //     messages={messages}
      //     setMessages={setMessages}
      //     roomMessages={roomMessages}
      //     setRoomMessages={setRoomMessages}
      //   />
      // );
    }
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
    /> )
    } else {
      return (
        <button 
          id='room-list-button'
          onClick={() => setRoomListOpen(!roomListOpen)} >Rooms</button>
      )
    }
  };

  return (
    <div id='dashboard'>
      <div>
        {displayCreateForm()}
      </div>
    </div>
  );
}

export default Dashboard;