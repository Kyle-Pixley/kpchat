import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CustomButton from './buttonComponent/CustomButton';


function Auth({ sessionToken, setSessionToken }) {

    const [ userName, setUserName ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ login, setLogin ] = useState(true);

    const updateAsyncStorage = async (newToken) => {
        await AsyncStorage.setItem('token', newToken);
        console.log('session token', sessionToken)
        setSessionToken(newToken);
    };

    const handleSubmit = () => {

        const url = login 
        ? "http://10.0.0.79:8081/auth/login" 
        : "http://10.0.0.79:8081/auth/signup";
        
        const body = login 
        ? { userName, password }
        : { userName, firstName, lastName, email, password }

        console.log("Sending request to:", url)
        console.log("Request body:", body)

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type" : "application/json",
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP status ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log("Data received" , data);
            if (data.token) {
                updateAsyncStorage(data.token);
            } else {
                console.log("No token received", data);
                throw new Error("No token in response")
            }
        })
        .catch(err => console.error("Error handling response", err))
    };

    const register = e = login ? null : (
        <>
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder='Enter E-mail here'/>
            
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={text => setFirstName(text)}
                placeholder='Enter first name here'/>
            
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={text => setLastName(text)}
                placeholder='Enter last name here'/>
        </>
    )

    const styles = StyleSheet.create({
        authContainer: {
            width: '100%',
            height: '100%',
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
        },
        toggleLoginButton: {
            borderWidth: 1,
            borderColor: 'black',
        }
    })


  return (
    <View style={styles.authContainer}>
        <Text style={styles.title}>KP CHAT</Text>

            <View>
                {register}
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
        onPress={handleSubmit} />

        <CustomButton
        buttonText={login ? 'Create Account' : 'Login Here'}
        onPress={() => setLogin(!login)}
        />
    </View>
  )
}

export default Auth