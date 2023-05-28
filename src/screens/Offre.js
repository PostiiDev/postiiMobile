import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../utils/Color';
import {useRecoilState, useRecoilValue} from 'recoil';
import {apiUrl, userInformation} from '../atom/authtication';
import {showMessage} from 'react-native-flash-message';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import moment from 'moment/min/moment-with-locales';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
export const Offre = () => {
  const [loading, setLoading] = useState(false);
  const [offre, setOffre] = useState([]);
  const [user, setUser] = useRecoilState(userInformation);
  const url = useRecoilValue(apiUrl);

  useEffect(() => {
    getAllOffre();
  }, []);
  const getAllOffre = async () => {
    const data = await fetchAllOffre();
    if (data) {
      console.log('data:', data.data);
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
      console.log('id:', id);

      let getOffre = await fetch(
        `${url}:5000/api/offre/myoffre/${id}`,
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
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Color.white} size="small" />
          <Text style={{paddingTop: '4%'}}>Loading ...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Mes Offre</Text>
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
                <Card.Cover source={{uri: 'https://picsum.photos/700'}} />

                <Card.Content>
                  <Text variant="titleLarge">{item.title}</Text>
                  <Text variant="bodyMedium">{item.Description}</Text>
                  <Text variant="bodyMedium">prix : {item.prix} dt</Text>
                  <Text variant="bodyMedium">
                    nombre de jour : {item.deadLine}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <Button>Posutler</Button>
                </Card.Actions>
              </Card>
            );
          })}
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
