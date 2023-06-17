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
import {Button} from 'react-native-paper';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import CardOffre from '../components/CardOffre';
import {Color} from '../utils/Color';
import {height, width} from '../utils/dimenion';
const HomeRegister = () => {
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

  const onChangeSearch = query => {};

  useEffect(() => {
    if (isFocused) {
      getAllOffre();
    }
  }, []);
  const getAllOffre = async () => {
    const data = await fetchAllOffre();
    if (data) {
      setOffre(() => data.data);
    } else {
      navigation.navigate('Login');
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
                <Image
                  source={require('../assets/logo/logo.png')}
                  style={{width: width, height: height / 8}}
                />
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Login')}>
                  Commencer
                </Button>
              </View>
            }
            data={offre}
            renderItem={({item}) => <CardOffre item={item} />}
            ListEmptyComponent={
              <Text style={{textAlign: 'center', fontSize: 18}}>
                il n'ya pas des offre pour le moment
              </Text>
            }
            initialNumToRender={10}
          />
        </View>
      )}
    </View>
  );
};

export default HomeRegister;

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
