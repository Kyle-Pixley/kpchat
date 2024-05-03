import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

function Box(props) {

    const styles = StyleSheet.create({
        box: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 30
        }
    });

  return (
    <View style={[styles.box, props.pressed && { backgroundColor: 'green'}]}>
        <Text style={styles.text}>{props.buttonText}</Text>
    </View>
  )
}

export default Box;