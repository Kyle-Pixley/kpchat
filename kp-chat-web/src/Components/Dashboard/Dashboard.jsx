import React, { useState, useEffect } from 'react';
import Rooms from './Rooms/Rooms.jsx';
import CreateRoom from './CreateRoom/CreateRoom.jsx';
import './Dashboard.css';

function Dashboard({ sessionToken, socket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [ selectedRoom, setSelectedRoom ] = useState(null);

  useEffect(() => {
    if (socket) {
      const handleMessage = (event) => {
        if (event.data instanceof Blob) {
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
        } else {
          console.error('Unexpected non-Blob data:', event.data);
        }
      };

      socket.addEventListener('message', handleMessage);

      return () => {
        socket.removeEventListener('message', handleMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if(selectedRoom != null) {

          const options = {
            method: 'GET',
            headers: new Headers({
              authorization: sessionToken,
            }),
          };

          const response = await fetch(`http://10.0.0.23:8081/message/${selectedRoom._id}` , options );
          console.log(selectedRoom, '============================')
          console.log(response, ' this is the response') 
          if (response.ok) {
            const data = await response.json();
            setMessages(data);
          } else {
            console.error('Failed to fetch messages:', response.statusText);
          }
        } else { null }

        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
    };

    fetchMessages();
  }, [sessionToken]);

  const displayCreateForm = () => {
    if (isOpen) {
      return (
        <>
          <button onClick={() => setIsOpen(false)}>Close</button>
          <CreateRoom sessionToken={sessionToken} />
        </>
      );
    } else {
      return <Rooms sessionToken={sessionToken} isOpen={isOpen} setIsOpen={setIsOpen} socket={socket} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />;
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