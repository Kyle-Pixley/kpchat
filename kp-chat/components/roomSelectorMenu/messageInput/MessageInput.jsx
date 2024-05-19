import React from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';

function MessageInput() {

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
        }
    })

  return (
    <View style={styles.messageInputContainer}>
        <TextInput style={styles.messageTextInput} />
        <Button 
        title={'O'} 
        />
    </View>
  )
}

export default MessageInput;