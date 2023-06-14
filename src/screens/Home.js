import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
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
import {height, width} from '../utils/dimenion';
const Home = () => {
  const [user, setUser] = useRecoilState(userInformation);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
  const [loading, setLoading] = useState(false);
  const [offre, setOffre] = useState([]);
  const url = useRecoilValue(apiUrl);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const onChangeSearch = query => {
  };
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getAllOffre();
    }
  }, []);
  const getAllOffre = async () => {
    const data = await fetchAllOffre();
    console.log('data:', data)
    if (data) {
      setOffre(() => data.data);
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
        <View style={{marginTop: '1%'}}>
          <View style={{margin: '5%'}}>
            <Searchbar
              placeholder="rechercher un offre"
              onChangeText={searchFilterFunction}
              value={search}
            />
          </View>
          <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>
            Chercher votre Offre et commancer a travailler{' '}
          </Text>
          <Image
            source={require('../assets/logo/logo.png')}
            style={{height: height / 7, width: width}}
          />
         
          <FlatList
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
