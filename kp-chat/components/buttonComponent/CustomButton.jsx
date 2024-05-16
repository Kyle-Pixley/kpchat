import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Box from './Box';


function CustomButton({ buttonText, onPress }) {

    const styles = StyleSheet.create({
        container: {
            height: 45,
            width: '55%',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 4,
        },
    })


  return (
    <View style={styles.container}>
        <Pressable onPress={onPress}>
            {(state) => <Box pressed={state.pressed} buttonText={buttonText}/>}
        </Pressable>
    </View>
  )
}

export default CustomButton;