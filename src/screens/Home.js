import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  apiUrl,
  isAuthenticatedUser,
  userInformation,
} from '../atom/authtication';
import {FlashList} from '@shopify/flash-list';

import {Button, Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import CardOffre from '../components/CardOffre';
import {Color} from '../utils/Color';
import {height} from '../utils/dimenion';
const Home = () => {
  const [user, setUser] = useRecoilState(userInformation);
  //console.log('user:', user.userInfo ?user.userInfo : 'no user exist here' )
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
  const [loading, setLoading] = useState(false);
  const [offre, setOffre] = useState([]);
  const url = useRecoilValue(apiUrl);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    console.log('query:', query);
  };
  const signout = async () => {
    await AsyncStorage.removeItem('user');
    setIsAuthenticated(() => false);
  };

  useEffect(() => {
    if (isFocused) {
      getAllOffre();
    }
  }, [isFocused]);
  const getAllOffre = async () => {
    const data = await fetchAllOffre();
    console.log('data:', data.length);
    if (data) {
      setOffre(() => data);
    }
  };

  const fetchAllOffre = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      setLoading(() => true);
      let value = await AsyncStorage.getItem('user');
      let parsedValue = JSON.parse(value);
      let id = parsedValue.userInfo._id;
      console.log('id:', id);

      let getOffre = await fetch(`${url}/api/offre`, requestOptions);
      let response = getOffre.json();
      return response;
    } catch (e) {
      showMessage({
        message: 'Network request failed!',
        type: 'danger',
        backgroundColor: 'red',
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>All Offre</Text>

      <Button onPress={signout}>sign out</Button> */}
      <View style={{padding: 10}}>
        {!loading && (
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        )}
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Color.white} size="small" />
          <Text style={{paddingTop: '4%'}}>Loading ...</Text>
        </View>
      ) : (
        <View style={{marginTop: '4%'}}>
          {offre.length > 0 && (
            <FlatList
              contentContainerStyle={{padding: 10}}
              data={offre}
              renderItem={({item}) => <CardOffre item={item} />}
              ListEmptyComponent={<Text>il n'ya pas des offre pour le moment</Text>}
              initialNumToRender={50}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
