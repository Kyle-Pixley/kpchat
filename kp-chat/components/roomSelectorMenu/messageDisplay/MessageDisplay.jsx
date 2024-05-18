import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
                    if (Array.isArray(data.allMessages)) {
                        setRoomMessages(data.allMessages)
                    } else {
                        setRoomMessages([]);
                    }
                })
            
        }
    }, [roomRef])

  return (
    <View style={styles.messageDisplayContainer}>
        {roomMessages.map((message, i) => {
            return <Message 
                        sessionToken={sessionToken}
                        key={i}
                        message={message}
                        />

        })}
    </View>
  )
}

export default MessageDisplay