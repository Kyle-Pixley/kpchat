import React, {useState, useEffect} from 'react';
import './Auth.css';

function Auth({ updateLocalStorage }) {

    const [ userName, setUserName ] = useState(""); 
    const [ firstName, setFirstName ] = useState(""); 
    const [ lastName, setLastName ] = useState(""); 
    const [ email, setEmail ] = useState(""); 
    const [ password, setPassword ] = useState("");

    const [ login, setLogin ] = useState(true);

    useEffect(() => {
        console.log(email, userName)
    }, [email,userName])
    const register = () => login ? null : (
        <>
            <input
                type='text'
                id='email'
                className='input'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter Email'
            />
            <input 
                type="text"
                id="firstName"
                className='input'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Enter First Name"
            />
            <input 
                type="text"
                id="lastName"
                className='input'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Enter Last Name"
        />
        </>
    )

    const toggle = e => {
        e.preventDefault();
        setLogin(!login)
        setUserName("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    const handleSubmit = e => {
        e.preventDefault();

        const url = login 
            ? "http://10.0.0.23:8081/auth/login"
            : "http://10.0.0.23:8081/auth/signup"

        const body = login 
            ? { userName, password }
            : { firstName, lastName, userName, email, password }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type" : "application/json"
            })
        })
        .then(res => res.json())
        .then(data => updateLocalStorage(data.token))
        .catch(err => console.log(err))

    }

  return (
    <div id='login'>
        <div id='title-parent'>
            <h1 className='title' id='title-1'>K</h1>
            <h1 className='title' id='title-2'>P</h1>
            <h1 className='title' id='title-hyphen'>-</h1>
            <h1 className='title' id='title-3'>C</h1>
            <h1 className='title' id='title-4'>H</h1>
            <h1 className='title' id='title-5'>A</h1>
            <h1 className='title' id='title-6'>T</h1>
        </div>

        <button id='signup-button' onClick={toggle}>{ login ? "To Signup?" : "To Login" }</button>
        <form action='' className='form-parent'>
            {register()}
            <input 
                type="text"
                id='user-name'
                className='input'
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder='User Name'
            />
            <input 
                type='password'
                id='password'
                className='input'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
            />
            <button id='submit-button' type='submit' onClick={handleSubmit}>{ login ? "Sign In" : "Register" }</button>
        </form>

    </div>
  )
}

export default Auth