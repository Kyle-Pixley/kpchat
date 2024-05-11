import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

export default function App() {
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        setSessionToken(token);
      } else {
        await AsyncStorage.removeItem('token');
        setSessionToken(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      {sessionToken ? 
        <Dashboard 
          sessionToken={sessionToken} 
          setSessionToken={setSessionToken}/> 
          : 
          <Dashboard 
          sessionToken={sessionToken} 
          setSessionToken={setSessionToken}/> 
        // <Auth 
        //   sessionToken={sessionToken} 
        //   setSessionToken={setSessionToken}/>
          }
          {/* ! make sure to fix this */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// npx expo start --tunnel

// you can clear the cache with 'expo start -c' 

// update the tools, libraries and frameworks regularly 