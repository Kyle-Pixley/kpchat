import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Box from './Box';


function CustomButton({ buttonText }) {

    const styles = StyleSheet.create({
        container: {
            height: 45,
            width: '50%',
            borderWidth: 1,
            borderColor: 'black',
            marginTop: 40,
            borderRadius: 4,
        },
    })


  return (
    <View style={styles.container}>
        <Pressable>
            {(state) => <Box pressed={state.pressed} buttonText={buttonText}/>}
        </Pressable>
    </View>
  )
}

export default CustomButton;