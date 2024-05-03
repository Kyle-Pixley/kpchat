import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

export default function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined);

  const checkToken = async () => {
    console.log('checkToken function triggered')
    try {
      const token = await AsyncStorage.getItem('token');

      if(!token) {
        console.log("No token found");
        return false;
      }

      console.log('Token retrieved:', token)
      return true;

    } catch (err) {
      console.error("Error checking token:", err);
      return false
    }
  };

  const validateToken = (token) => {
    console.log('validateToken function')
    try { 
      if(token == undefined) return false;

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (err) {
      console.error("Error decoding token:", err);
      return false;
    }
  };

  const isAuthenticated = async () => {
    console.log('isAuthenticated function triggered')
    try {
      const tokenExists = await checkToken();
      console.log(checkToken);

      if(!checkToken) return false;
      
      if (!tokenExists) return false;
      
      const token = await AsyncStorage.getItem('token');
      const tokenValidity = validateToken(token);
      return tokenValidity;
    } catch (err) {
      console.error('Error in isAuthenticated', err)
      return false;
    }
  };

  const displayHome = () => {
    if(isAuthenticated === true) {
      return (
        <Dashboard sessionToken={sessionToken} />
      )
    } else {
      return (
        <Auth updateAsyncStorage={updateAsyncStorage} />
      )
    }
  };

  const updateAsyncStorage = async (newToken) => {
    await AsyncStorage.setItem("token", newToken)
    setSessionToken(newToken)
  };



  return (
    <View style={styles.container}>
      {displayHome()}
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
