import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Animated } from 'react-native';
import CustomButton from '../buttonComponent/CustomButton';
import UsersRoomsList from './usersRoomsList/UsersRoomsList';


function RoomSelectorMenu({ toggleRoomMenu, setToggleRoomMenu, setSessionToken, setRoomRef }) {

    const styles = StyleSheet.create({
        roomSelectorMenu: {
            height: '100%',
            width: '70%',
            backgroundColor: 'rgb(19, 105, 144)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 99,
            alignItems: 'center',
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
            width: '95%',
        },
        logoutButtonContainer: {
            width: '80%',
        },
    });

    const slideIn = useRef(new Animated.ValueXY({ x: -300, y: 0 })).current;

    const startSlideIn = () => {
            Animated.timing(slideIn, {
                toValue: { x: 0, y: 0 },
                duration: 300,
                useNativeDriver: true,
            }).start();
    };

    useEffect(() => {
        startSlideIn()
    }, [])

  return (
    <Animated.View style={[ styles.roomSelectorMenu, { transform: slideIn.getTranslateTransform()}]}>
        <View style={styles.roomMenuTextButtonParent}>
            <Text style={styles.roomSelectorMenuTitle}>Room Selector Menu</Text>
            <Button title='S' 
            style={styles.menuToggleButton}
            onPress={() => setToggleRoomMenu(!toggleRoomMenu)}/>
            </View>
        <View style={styles.roomList}>
            <UsersRoomsList setRoomRef={setRoomRef} />
        </View>
        <View style={styles.logoutButtonContainer}>
            <CustomButton style={styles.logoutButton} buttonText={'Logout'}
                onPress={() => setSessionToken(null)}/>
        </View>
    </Animated.View>
  )
}

export default RoomSelectorMenu;