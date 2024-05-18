import React, { useState } from 'react';
import { View, Text } from 'react-native';

function Message({ message }) {
  return (
    <View>
        <Text>{message.body}</Text>
    </View>
  )
}

export default Message