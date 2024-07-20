import React, { useState } from 'react';
import './CreateRoom.css';

function CreateRoom({ sessionToken }) {

  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");

  const submitForm = e => {
    e.preventDefault();
    const url = "http://10.0.0.23:8081/rooms/"

    const body = { name, description };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type" : "application/json",
        authorization: sessionToken
      })
    }
    fetch(url, options)
      .then(res => res.json())
      .then(data => console.log(data));

    setName("");
    setDescription("");
  }

  return (
    <div id='create-room-component'>
      <form id='create-room' action="" method="POST">
        <h2 id='form-title'>Create a Room</h2>
        <label id='name-label' className='input-labels'>Name</label>
        <input
          required 
          id='create-room-name-input'
          className='create-room-inputs'
          type='text'
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength='12'
          placeholder='Name'
        />
        <label id='description-label' className='input-labels'>Description</label>
        <textarea
          rows='4'
          id='create-room-description-input'
          className='create-room-inputs'
          type='text'
          name='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Description'
        />
        <button id='submit-button' onClick={submitForm}>Submit</button>
      </form>
    </div>
  )
}

export default CreateRoom;