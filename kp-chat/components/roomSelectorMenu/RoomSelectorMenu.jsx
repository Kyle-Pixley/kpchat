import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

function RoomSelectorMenu({ toggleRoomMenu, setToggleRoomMenu }) {

    const styles = StyleSheet.create({
        roomSelectorMenu: {
            height: '80%',
            width: '80%',
            backgroundColor: 'rgb(19, 105, 144)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 99,
        },
        roomMenuTextButtonParent: {
            flex: 1,
            flexDirection: 'row',
            marginTop: 60,
            marginLeft: 8,
        },
        roomSelectorMenuTitle: {
            
            fontSize: 25,
        },
        menuToggleButton: {
            
        }
    })

  return (
    <View style={styles.roomSelectorMenu}>
        <View style={styles.roomMenuTextButtonParent}>
        <Text style={styles.roomSelectorMenuTitle}>Room Selector Menu</Text>
        <Button title='S' 
        style={styles.menuToggleButton}
        onPress={() => setToggleRoomMenu(!toggleRoomMenu)}/>
        </View>
    </View>
  )
}

export default RoomSelectorMenu;