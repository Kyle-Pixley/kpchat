import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import RoomSelectorMenu from './roomSelectorMenu/RoomSelectorMenu';

function Dashboard({ setSessionToken }) {

  const [ roomRef, setRoomRef ] = useState('');
  const [ toggleRoomMenu, setToggleRoomMenu ] = useState(false);

  const styles = StyleSheet.create({
    dashboardContainer: {
      backgroundColor: 'rgb(1, 101, 147)',
      height: '100%',
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.dashboardContainer}>
      <Button title="Room Selector" onPress={() => setToggleRoomMenu(!toggleRoomMenu)}/>
      { toggleRoomMenu ? 
      <RoomSelectorMenu 
      style={styles.roomSelectorMenu}
      toggleRoomMenu={toggleRoomMenu}
      setToggleRoomMenu={setToggleRoomMenu} /> 
      : null }
      <Text>
        dashboard
      </Text>
    </View>
  )
}

export default Dashboard;