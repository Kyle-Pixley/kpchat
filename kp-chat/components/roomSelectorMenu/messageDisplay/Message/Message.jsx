import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { jwtDecode, jwtPayload } from 'jwt-decode';


function Message({ message, sessionToken }) {

    const [ messageSender, setMessageSender ] = useState('');
    const [ alignment, setAlignment ] = useState('flex-start');

    useEffect(() => {

        const alignMessageToSide = async () => {
            
            const decodedSessionToken = jwtDecode(sessionToken);
            
            const loggedInUser = decodedSessionToken._id;
            
            const messageSenderUserName = message.user._id;
            
            if(loggedInUser === messageSenderUserName) {
                setAlignment('flex-end')
            } else {
                setAlignment('flex-start')
            }
        };
        alignMessageToSide();
    }, [message])
        
    const styles = StyleSheet.create({
        messageContainer: {
            alignItems: alignment,
            paddingTop: 8,
        },
        messageSenderText: {
            
        },
        messageBodyText: {
            alignSelf: alignment,
            borderWidth: 1,
            backgroundColor: 'lightblue',
            fontSize: 20,
            alignItems: 'flex-end',
            maxWidth: '50%',
        },
    })

  return (
    <View style={styles.messageContainer}>
        <Text style={styles.messageBodyText}>
            {message.body}
        </Text>
        <Text style={styles.messageSenderText}>
            -{message.user.userName}
        </Text>
    </View>
  )
}

export default Message