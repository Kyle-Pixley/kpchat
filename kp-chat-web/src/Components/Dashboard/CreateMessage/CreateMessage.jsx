import React, { useState } from 'react';
import  * as decode  from 'jwt-decode';
import './CreateMessage.css';

function CreateMessage({ sessionToken, selectedRoom, messageCreated, socket }) {

  const [ messageBody, setMessageBody ] = useState('');

  const submitMessage = e => {
    e.preventDefault();

    if(messageBody.trim() === '') return;

    const user = decode.jwtDecode(sessionToken);
    
//! --------------------------------------
    const message = {
      user: user,
      room: selectedRoom._id,
      body: messageBody,
    };

    if(socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
//! the issue lies here I think but I am too tired to think 

    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type" : "application/json",
        authorization: sessionToken,
      }),
      body: JSON.stringify(message),
    }
    fetch(`http://10.0.0.23:8081/message/${selectedRoom._id}`, options)
      .then(res => res.json())
      .catch((error) => {
        console.log(`error`, error)
      });
      setMessageBody("");
  }

  return (
    <div style={{width: '90%'}}>
      <form action='' id='new-message-form'>
        <input 
          id='message-input'
          type='text'
          value={messageBody}
          onChange={e => setMessageBody(e.target.value)}
        />
        <span id='before'></span>
        <button id='submit-message' onClick={submitMessage}>Send</button>
      </form>
    </div>
  )
}

export default CreateMessage;