import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import RoomSelectorMenu from './roomSelectorMenu/RoomSelectorMenu';
import MessageDisplay from './roomSelectorMenu/messageDisplay/MessageDisplay';
import MessageInput from './roomSelectorMenu/messageInput/MessageInput';

function Dashboard({ sessionToken, setSessionToken }) {

  const [ roomRef, setRoomRef ] = useState('');
  const [ toggleRoomMenu, setToggleRoomMenu ] = useState(false);
  const [ roomMessages, setRoomMessages ] = useState([]);
  const roomMessageRef = useRef(null);

  const styles = StyleSheet.create({
    dashboardContainer: {
      backgroundColor: 'rgb(1, 101, 147)',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bannerContainer: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'black',
      alignItems: 'flex-start',
    }
  });

  const handleMessageCreated = (newMessage) => {
    setRoomMessages([...roomMessages, newMessage])
  };

  useEffect(() => {
    if(roomMessageRef.current) {
      roomMessageRef.current.scrollTo(0, roomMessageRef.current.scrollHeight)
    }
  }, [ roomMessages ])

  return (
    <View style={styles.dashboardContainer}>

      <View style={styles.bannerContainer}>
        <Button title="Room Selector" onPress={() => setToggleRoomMenu(!toggleRoomMenu)}/>
      </View>

      { toggleRoomMenu ? 
      <RoomSelectorMenu 
      style={styles.roomSelectorMenu}
      toggleRoomMenu={toggleRoomMenu}
      setToggleRoomMenu={setToggleRoomMenu}
      setSessionToken={setSessionToken} 
      setRoomRef={setRoomRef} /> 
      : null }

      <MessageDisplay 
      roomRef={roomRef} 
      sessionToken={sessionToken} 
      roomMessages={roomMessages}
      setRoomMessages={setRoomMessages} 
      roomMessageRef={roomMessageRef} />

      <MessageInput 
      roomRef={roomRef} 
      sessionToken={sessionToken} 
      messageCreated={handleMessageCreated} />

    </View>
  )
}

export default Dashboard;