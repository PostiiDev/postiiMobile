import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
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
const LeftContent = props => (
  <Avatar.Icon {...props} icon="lightbulb-on-outline" color="#fff" />
);
export const Offre = () => {
  const [loading, setLoading] = useState(false);
  const [offre, setOffre] = useState([]);
  const [user, setUser] = useRecoilState(userInformation);
  const url = useRecoilValue(apiUrl);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getAllOffre();
    }
  }, [isFocused]);
  const getAllOffre = async () => {
    const data = await fetchAllOffre();
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

      let getOffre = await fetch(
        `${url}/api/offre/myoffre/${id}`,
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

  const onRefresh = useCallback(() => {
    fetchAllOffre();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Color.white} size="small" />
          <Text style={{paddingTop: '4%'}}>Loading ...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={styles.title}>Mes Offre</Text>

          <Button onPress={() => navigation.navigate('OffreCreate')}>
            Creer un offre
          </Button>
          {offre.length > 0 ? (
            <View>
              {offre.map((item, index) => {
                return (
                  <Card
                    style={{
                      width: '95%',
                      marginVertical: '2%',
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}
                    key={index}>
                    <Card.Title
                      title={item.category}
                      subtitle={moment(item.createdAt).locale('fr').fromNow()}
                      left={LeftContent}
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate('OffreDetail', {item})
                      }>
                      <Card.Cover
                        source={{
                          uri: item.cover
                            ? item.cover
                            : 'https://picsum.photos/700',
                        }}
                      />
                    </Pressable>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <Card.Content>
                        <Text variant="titleLarge">{item.title}</Text>
                        <Pressable
                          onPress={() =>
                            navigation.navigate('OffreDetail', {item})
                          }>
                          <Markdown>
                            {item.Description.slice(0, 80).concat(
                              '... voir detail',
                            )}
                          </Markdown>
                        </Pressable>
                        <Text variant="bodyMedium">
                          date de livraison estimé :{' '}
                          {moment(item.deadLine).format('DD-MM-YYYY')}
                        </Text>
                      </Card.Content>
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          width: width / 3,
                          alignItems: 'flex-end',
                          alignContent: 'flex-end',
                          marginBottom: '2%',
                        }}>
                        <AntDesign name="edit" color="#666" size={25} />
                        <AntDesign name="delete" color="red" size={25} />
                      </View> */}
                    </View>
                    <Card.Actions>
                      <Button
                        onPress={() =>
                          navigation.navigate('OffreDetail', {item})
                        }>
                        Voir Detail
                      </Button>
                    </Card.Actions>
                  </Card>
                );
              })}
            </View>
          ) : (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  letterSpacing: 1.2,
                }}>
                Creer Votre Premier Offre
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '2%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primary,
    letterSpacing: 1.3,
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
  },
});
