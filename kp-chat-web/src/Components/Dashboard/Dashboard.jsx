import React, { useState, useEffect } from 'react';
import Rooms from './Rooms/Rooms.jsx';
import CreateRoom from './CreateRoom/CreateRoom.jsx';
import './Dashboard.css';

function Dashboard({ sessionToken, socket }) {

  const [ isOpen, setIsOpen ] = useState(false);
  //! might need to put this in room.jsx -------
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const newMessage = JSON.parse(reader.result);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', reader.result, error);
          }
        };
        reader.onerror = (error) => {
          console.error('Failed to read Blob:', error);
        };
        reader.readAsText(event.data);
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?token=${sessionToken}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [sessionToken]);

  //! ===========================================

  const displayCreateForm = () => {
    if(isOpen) {
      return (
        <>
          <button onClick={e => setIsOpen(false)}>Close</button>
          <CreateRoom sessionToken={sessionToken} />
        </>
      )
    } else {
      return <Rooms sessionToken={sessionToken} isOpen={isOpen} setIsOpen={setIsOpen} socket={socket} />
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