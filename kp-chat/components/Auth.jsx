import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, } from 'react-native';
import CustomButton from './buttonComponent/CustomButton';


function Auth({ updateAsyncStorage }) {

    const [ userName, setUserName ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ login, setLogin ] = useState(true);

    const handleSubmit = e => {

        const url = login 
        ? "http://127.0.0.1:4000/auth/login" 
        : "http://127.0.0.1:4000/auth/signup";

        console.log(url, ' this is the url')
        
        const body = login 
            ? { userName, password }
            : { userName, firstName, lastName, email, password }
            console.log(body, ' this is the body')

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type" : "application/json"
            })
        })
        .then(res => res.json())
        .then(data => updateAsyncStorage(data.token))
        .catch(err => console.log(err))
    };

    const styles = StyleSheet.create({
        authContainer: {
            width: '100%',
            height: '100%',
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(1, 101, 147)'
        },
        title: {
            fontSize: 80,
            fontFamily: 'Cochin'
        },
        inputLabel: {
            alignSelf: 'center',
            fontSize: 20,
            marginTop: 20
        },
        input: {
            height: 40,
            width: '60%',
            borderWidth: 1,
            padding: 6,
            fontSize: 30,
            borderRadius: 4,
            marginTop: 8
        },
        submitButton: {
            height: 40,
            width: '50%',
            alignItems: 'center',
            marginTop: 30,
            borderWidth: 1,
            borderRadius: 4,
        },
        submitButtonText: {
            fontSize: 30
        }
    })


  return (
    <View style={styles.authContainer}>
        <Text style={styles.title}>KP CHAT</Text>

            <View>
                <Text style={styles.inputLabel}>User Name</Text>

                <TextInput 
                style={styles.input}
                value={userName}
                onChangeText={text => setUserName(text)}
                placeholder='Enter user name here'/>

            </View>
            <View>
                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                style={styles.input} 
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder='Enter password here'/>

            </View>

        <CustomButton 
        buttonText={login ? 'Login' : 'Submit'}
        handleSubmit={handleSubmit} />

    </View>
  )
}

export default Auth