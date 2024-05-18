import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Message from './Message/Message';

function MessageDisplay({ roomRef, sessionToken }) {

    const [ roomMessages, setRoomMessages ] = useState([]);

    const styles = StyleSheet.create({
        messageDisplayContainer: {
            height: '80%',
            width: '95%',
            borderWidth: 1,
            borderColor: 'black',
        }
    });

    useEffect(() => {

        if (roomRef) {

            const roomId = roomRef._id;
        
            const options = {
                method: 'GET',
                headers: new Headers ({
                    authorization: sessionToken,
                }),
            };

            fetch(`http://10.0.0.79:8081/message/${roomId}`, options)
                .then(res => res.json())
                .then(data => {
                    console.log(data, ` This is all the messages for ${roomRef.name}.`)
                    if (Array.isArray(data.allMessages)) {
                        setRoomMessages(data.allMessages)
                        console.log(roomMessages,' this is room messages ---------------')
                    } else {
                        setRoomMessages([]);
                    }
                })
            
        }
    }, [roomRef])

  return (
    <View style={styles.messageDisplayContainer}>
        <Text>{roomRef.description}</Text>
        {roomMessages.map((message, i) => {
            return <Message 
                        key={i}
                        message={message}
                        />

        })}
    </View>
  )
}

export default MessageDisplay