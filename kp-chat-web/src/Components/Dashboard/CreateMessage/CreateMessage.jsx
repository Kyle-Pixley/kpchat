import React, { useState } from 'react';
import './CreateMessage.css';

function CreateMessage({ sessionToken, selectedRoom, messageCreated }) {

  const [ messageBody, setMessageBody ] = useState('');

  const submitMessage = e => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type" : "application/json",
        authorization: sessionToken,
      }),
      body: JSON.stringify({
        body: messageBody,
        room: selectedRoom._id,
      }),
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
    <div>
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