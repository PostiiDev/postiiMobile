import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Color} from '../utils/Color';
import {useRecoilState, useRecoilValue} from 'recoil';
import {apiUrl, userInformation} from '../atom/authtication';
import {showMessage} from 'react-native-flash-message';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import moment from 'moment/min/moment-with-locales';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {width} from '../utils/dimenion';
import Markdown from 'react-native-markdown-display';
import {FlashList} from '@shopify/flash-list';
import PropostionCard from '../components/PropostionCard';

const Proposition = ({route}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState(false);
  const [offre, setOffre] = useState([]);
  const [user, setUser] = useRecoilState(userInformation);
  const url = useRecoilValue(apiUrl);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getPropotionByOffreID();
    }
  }, [isFocused]);

  const getPropotionByOffreID = async () => {
    const data = await fetchAllPropostionByOffreId();
    setOffre(() => data);
  };

  const fetchAllPropostionByOffreId = async () => {
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

      let getOffre = await fetch(
        `${url}/api/propo/propositon/${id}`,
        requestOptions,
      );
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
      <FlatList
        data={offre}
        renderItem={({item, index}) => {
          return <PropostionCard item={item} index={index}/>;
        }}
        ListHeaderComponent={
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1.2,
              }}>
              Vos Proposition
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Proposition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
