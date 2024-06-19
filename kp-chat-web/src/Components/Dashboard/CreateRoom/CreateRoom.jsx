import React, { useState } from 'react';
import './CreateRoom.css';

function CreateRoom({ sessionToken }) {

  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");

  const submitForm = e => {
    e.preventDefault();
    const url = "http://10.0.0.23:8081/room/"

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
    <div>
      <form id='create-room' action="" method="POST">
        <h2 id='form-title'>Create Room</h2>
        <label id='name-label'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Name'
        />
        <label id='description-label'>Description</label>
        <input
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