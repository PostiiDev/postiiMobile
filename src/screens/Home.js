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


  useEffect(() => {
    if (isFocused) {
      getAllOffre();
    }
  }, []);
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
      console.log(' user_id:', id);

      let getOffre = await fetch(`${url}/api/offre`, requestOptions);
      let response = getOffre.json();
      return response;
    } catch (e) {
      showMessage({
        message: 'Network request failed!',
        type: 'danger',
        backgroundColor: 'red',
      });
      setLoading(false);

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
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Color.white} size="small" />
          <Text style={{paddingTop: '4%'}}>Loading ...</Text>
        </View>
      ) : (
        <View style={{marginTop: '4%'}}>
          <FlatList
            ListHeaderComponent={
              <View style={{margin: '5%'}}>
                <Searchbar
                  placeholder="rechercher un offre"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                />
              </View>
            }
            contentContainerStyle={{}}
            data={offre}
            renderItem={({item}) => <CardOffre item={item} />}
            ListEmptyComponent={
              <Text>il n'ya pas des offre pour le moment</Text>
            }
            initialNumToRender={10}
          />
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
