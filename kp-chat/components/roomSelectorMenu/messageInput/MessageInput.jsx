import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';

function MessageInput({ roomRef, sessionToken, messageCreated }) {

    const [ messageBody, setMessageBody ] = useState('');

    useEffect(() => {
        console.log(messageBody, ' this is the useEffect message body')
    }, [messageBody])

    const styles = StyleSheet.create({
        messageInputContainer: {
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        messageTextInput: {
            width: '60%',
            height: 25,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: 'green',
        },
        messageSubmitButton: {
            backgroundColor: 'red',
            height: 25,
            width: 25,
            borderWidth: 1,
            borderColor: 'black',
        }
    })

    const submitMessage = () => {

        const roomId = roomRef._id

        const options = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                authorization: sessionToken,
            }),
            body: JSON.stringify({
                body: messageBody,
                room: roomId,
            }),
        }
        


        fetch(`http://10.0.0.79:8081/message/${roomId}`, options)
            .then(res => res.json())
            .then((data) => {
                console.log(messageBody, ' this should be the message body')
                console.log(data)
                if(data && data.newMessage) {
                    const newMessage = data.newMessage
                    messageCreated(newMessage)
                }
            })
            .catch((error) => {
                console.log(`error`, error)
            })

            setMessageBody("")
    }

  return (
    <View style={styles.messageInputContainer}>
        <TextInput 
        style={styles.messageTextInput} 
        value={messageBody}
        onChangeText={text => setMessageBody(text)}/>
        <Pressable 
        style={styles.messageSubmitButton}
        onPress={submitMessage}
        />
    </View>
  )
}

export default MessageInput;