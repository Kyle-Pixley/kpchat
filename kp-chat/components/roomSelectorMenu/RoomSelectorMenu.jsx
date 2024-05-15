import React from 'react';
import CustomButton from '../buttonComponent/CustomButton';
import { StyleSheet, View, Text, Button } from 'react-native';

function RoomSelectorMenu({ toggleRoomMenu, setToggleRoomMenu }) {

    const styles = StyleSheet.create({
        roomSelectorMenu: {
            height: '100%',
            width: '80%',
            backgroundColor: 'rgb(19, 105, 144)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 99,
            alignContent: 'center',
        },
        roomMenuTextButtonParent: {
            flexDirection: 'row',
            marginTop: 60,
            marginLeft: 8,
            borderWidth: 1,
            borderColor: 'black',
            justifyContent: 'space-between',
            paddingLeft: 12,
            paddingRight: 12,
        },
        roomSelectorMenuTitle: {
            fontSize: 25,
        },
        menuToggleButton: {
            
        },
        roomList: {
            height: '80%',
            borderWidth: 1,
            borderColor: 'black',
            marginLeft: 8,
            marginRight: 8,
            marginTop: 8,
            marginBottom: 8,
        },
        logoutButtonContainer: {
            width: '100%',
            alignContent: 'center',
            padding: 0,
            alignItems: 'center',
        },
    })

  return (
    <View style={styles.roomSelectorMenu}>
        <View style={styles.roomMenuTextButtonParent}>
            <Text style={styles.roomSelectorMenuTitle}>Room Selector Menu</Text>
            <Button title='S' 
            style={styles.menuToggleButton}
            onPress={() => setToggleRoomMenu(!toggleRoomMenu)}/>
            </View>
        <View style={styles.roomList}>

        </View>
        <View style={styles.logoutButtonContainer}>
            <CustomButton style={styles.logoutButton} buttonText={'Logout'}
                onPress={() => setSessionToken(null)}/>
        </View>
    </View>
  )
}

export default RoomSelectorMenu;