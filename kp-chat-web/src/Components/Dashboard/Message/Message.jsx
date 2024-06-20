import React, { useState } from 'react';
import  * as decode  from 'jwt-decode';
import './Message.css';

function Message({ message, sessionToken, getAllMessages }) {

  const [ showOptions, setShowOptions ] = useState(false);
  const [ inEdit, setInEdit ] = useState(false);
  const [ newEditMessage, setNewEditMessage ] = useState("");

  const handleMouseEnter = (e, messageUser) => {
    const decodedToken = decode.jwtDecode(sessionToken);
    if (decodedToken.isAdmin || (messageUser && decodedToken._id === messageUser._id)) {
      setShowOptions(true);
    }
  }

  const handleMouseLeave = e => {
    setShowOptions(false);
  }

  const enableEditMessage = e => {
    setInEdit(true);
  }

  const cancelEditMessage = e => {
    setInEdit(false);
    setNewEditMessage("");
  }

  const submitEditMessage = e => {
    const options = {
      method: "PUT",
      body: JSON.stringify({ body: newEditMessage }),
      headers: new Headers({
        "Content-Type" : "application/json",
        authorization: sessionToken
      })
    }

    fetch(`http://10.0.0.23:8081/message/${message._id}`, options)
      .then(res => res.json())
      .then(() => getAllMessages())

    cancelEditMessage();
  }

  const handleDeleteMessage = e => {
    const options = { 
      method: "DELETE",
      headers: new Headers({
        authorization: sessionToken
      })
    }
    fetch(`http://10.0.0.23:8081/message/${message._id}`, options)
      .then(res => res.json())
      .then(() => getAllMessages());
  }

  const handleSenderAlign = () => {
    const decodedToken2 = decode.jwtDecode(sessionToken);
    if(message.user._id === decodedToken2._id){
      return 'message-sent'
    } else {
      return 'message-received'
    }
  }

  
  return (
    <div id='message-group' onMouseEnter={e => handleMouseEnter(e, message.user)} onMouseLeave={handleMouseLeave}>

      { inEdit
        ? <>
            <input  
              type='text'
              value={newEditMessage}
              onChange={e => setNewEditMessage(e.target.value)}
            />
            <button onClick={cancelEditMessage}>Cancel</button>
            <button onClick={submitEditMessage}>Save</button>
          </>
          :
          <div className='message-parents'>
            <p id='message-body' className= 
              {handleSenderAlign()}>{message.body}
            </p>
          </div>
          }

      <div className='message-parents'>
        <p id='signature' className={handleSenderAlign()}>-{message.user ? message.user.userName : 'Deleted User'}</p>
      </div>
      { showOptions && !inEdit 
        ? <div id='message-menu'>
            <button onClick={enableEditMessage}>Edit</button>
            <button onClick={handleDeleteMessage}>Delete</button>
            </div>
            : null }
    </div>
  )
}

export default Message;