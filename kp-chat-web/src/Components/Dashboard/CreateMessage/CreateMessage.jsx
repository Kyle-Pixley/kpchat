import React, { useState } from 'react';
import  * as decode  from 'jwt-decode';
import './CreateMessage.css';

function CreateMessage({ sessionToken, selectedRoom, messageCreated, socket }) {

  const [ messageBody, setMessageBody ] = useState('');

  const submitMessage = e => {
    e.preventDefault();

    if(messageBody.trim() === '') return;
    console.log(messageBody, ' message body');

    const user = decode.jwtDecode(sessionToken);

    console.log(decode.jwtDecode(sessionToken), '===============================');

    const message = {
      user: user._id,
      room: selectedRoom._id,
      body: messageBody,
    };

    if(socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(messageBody));
      //!changed this from message to messageBody
    } else {
      console.error('WebSocket is not open');
    }


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
      .then((data) => {
        if(data && data.newMessage) {
          const newMessage = data.newMessage
          messageCreated(newMessage)
        }
      })
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