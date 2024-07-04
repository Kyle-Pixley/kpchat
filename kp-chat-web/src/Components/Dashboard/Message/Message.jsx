import React, { useState } from 'react';
import * as decode from 'jwt-decode';
import './Message.css';

function Message({ message, sessionToken, getAllMessages }) {
  const [showOptions, setShowOptions] = useState(false);
  const [inEdit, setInEdit] = useState(false);
  const [newEditMessage, setNewEditMessage] = useState("");

  const handleMouseEnter = (messageUser) => {
    const decodedToken = decode.jwtDecode(sessionToken);
    if (decodedToken.isAdmin || (messageUser && decodedToken._id === messageUser._id)) {
      setShowOptions(true);
    }
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const enableEditMessage = () => {
    setInEdit(true);
  };

  const cancelEditMessage = () => {
    setInEdit(false);
    setNewEditMessage("");
  };

  const submitEditMessage = () => {
    const options = {
      method: "PUT",
      body: JSON.stringify({ body: newEditMessage }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    };

    fetch(`http://10.0.0.23:8081/message/${message._id}`, options)
      .then((res) => res.json())
      .then(() => getAllMessages());

    cancelEditMessage();
  };

  const handleDeleteMessage = () => {
    const options = {
      method: "DELETE",
      headers: new Headers({
        authorization: sessionToken,
      }),
    };
    fetch(`http://10.0.0.23:8081/message/${message._id}`, options)
      .then((res) => res.json())
      .then(() => getAllMessages());
  };

  const handleSenderAlign = () => {

    const decodedToken2 = decode.jwtDecode(sessionToken);
    
    if (typeof message.user === 'object' && message.user !== null) {
      if (message.user._id === decodedToken2._id) {
        return 'message-sent';
      } else {
        return 'message-received';
      }
    } else if (typeof message.user === 'string') {
      if (message.usersId === decodedToken2._id) {
        return 'message-sent';
      } else {
        return 'message-received';
      }
    } else return 'message-received';
  };

  const messageSignature = () => {
    if(typeof message.user === 'string') {
      return message.user
    } else if(typeof message.user === 'object' && message.user !== null) {
      return message.user.userName
    } else return 'Deleted User'
  };

  return (
    <div id='message-group' onMouseEnter={() => handleMouseEnter(message.user)} onMouseLeave={handleMouseLeave}>
      {inEdit ? (
        <>
          <input
            type='text'
            value={newEditMessage}
            onChange={(e) => setNewEditMessage(e.target.value)}
          />
          <button onClick={cancelEditMessage}>Cancel</button>
          <button onClick={submitEditMessage}>Save</button>
        </>
      ) : (
        <div className='message-parents'>
          <p id='message-body' className={handleSenderAlign()}>
            {message.body}
          </p>
        </div>
      )}
      <div className='message-parents'>
        <p id='signature' className={handleSenderAlign()}>
          -{messageSignature()}
        </p>
      </div>
      {showOptions && !inEdit ? (
        <div id='message-menu'>
          <button onClick={enableEditMessage}>Edit</button>
          <button onClick={handleDeleteMessage}>Delete</button>
        </div>
      ) : null}
    </div>
  );
}

export default Message;