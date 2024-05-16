import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import CustomButton from '../../buttonComponent/CustomButton';
import { View, Text } from 'react-native';

function UsersRoomsList() {
  const [usersRooms, setUsersRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserId = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token !== null) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        const userId = decodedToken._id;
        console.log(userId, ' this is the user id')
        return userId;
      } else {
        console.log('Token not found');
        return null;
      }
    } catch (err) {
      console.error("Error getting user id:", err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId();
      if (userId) {
        const token = await AsyncStorage.getItem('token');
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };

        fetch(`http://10.0.0.79:8081/auth/getUsersRooms/${userId}`, options)
          .then(res => res.json())
          .then(data => {
            console.log(data, ' this is the data');
            if (data.rooms) {
              setUsersRooms(data.rooms);
            } else {
              console.log('Rooms not found in response:', data)
            }
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        usersRooms.length > 0 ? (
          usersRooms.map((room, i) => (
            <CustomButton key={i} buttonText={room.name} onClick={() => console.log('make this active room')} />
          ))
        ) : (
          <Text>No rooms found</Text>
        )
      )}
    </View>
  );
}

export default UsersRoomsList;
