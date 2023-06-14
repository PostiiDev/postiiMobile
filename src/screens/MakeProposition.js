import {StyleSheet, View, Pressable, Alert, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Markdown from 'react-native-markdown-display';

import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilValue} from 'recoil';
import {apiUrl} from '../atom/authtication';
import {Button, Card, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../utils/Color';
import {width} from '../utils/dimenion';
import moment from 'moment/min/moment-with-locales';

const MakeProposition = ({route}) => {
  const {id, sellerId, item} = route.params;
  const api = useRecoilValue(apiUrl);
  const navigation = useNavigation();
  const [block, setBlock] = useState(false);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [toggleText, setToggleText] = useState(false);

  const voirDetail = (id, sellerId) => {
    setToggleText(() => true);
    // if (text.length > 0) {
    //   getOffreStatus(id, sellerId);
    // } else {
    //   Alert.alert('Note', 'vous devez proposer un prix  pour cet offre');
    // }
  };
  const getOffreStatus = async (id, sellerId) => {
    if (text.length > 0) {

    
    let result = await postulerOffre(id, sellerId);
    console.log('result: after send postuler to offre ====> ', result);
    if (result == 201) {
      showMessage({
        message: 'vous avez postuler a cet offre!',
        type: 'success',
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
    } else if (result == 202) {
      showMessage({
        message: 'vous avez deja postuler a cet offre!',
        type: 'warning',
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
    } else {
      showMessage({
        message: 'Network request failed!',
        type: 'danger',
        backgroundColor: 'red',
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      });
    }
  }else {
    Alert.alert('Note', 'vous devez proposer un prix  pour cet offre');

  }
  };

  const postulerOffre = async (id, sellerId) => {
    console.log('Offre ID ==========> :', id);
      setBlock(() => true);
      try {
        let value = await AsyncStorage.getItem('user');
        let parsedValue = JSON.parse(value);
        let userInfo = parsedValue.userInfo._id;
        let data = {
          prix: text,
          msg: message,
          buyerId: userInfo,
          sellerId: sellerId,
          offreId: id,
        };

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(data),
        };
        let url = `${api}/api/propo/${id}`;
        let result = await fetch(url, requestOptions);
        return result.status;
      } catch (e) {
        setBlock(() => false);
      } finally {
        setBlock(() => false);
      }
   
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <Card key={item._id} style={{marginVertical: 4, marginHorizontal: '4%'}}>
        <Card.Title title={item.title} />
        <Pressable
          onPress={() => voirDetail(item._id, item.userId)}
          disabled={block}>
          <Card.Cover
            source={{
              uri: item.cover != '' ? item.cover : 'https://picsum.photos/700',
            }}
          />
        </Pressable>
        <Card.Content>
          <Text variant="titleLarge">{item.title}</Text>
          <Text variant="bodyMedium"> description :</Text>
          <Markdown>{item.Description}</Markdown>

          <Text
            variant="bodyMedium"
            style={{
              marginTop: '2%',
              paddingLeft: 5,
              color: '#000',
              fontSize: 16,
            }}>
            date de livraison estimé :{' '}
            <Text style={{color: 'green', fontSize: 16}}>
              {' '}
              {moment(item.deadLine).format('DD-MM-YYYY')}
            </Text>
          </Text>
        </Card.Content>
     
    
          <View style={{margin: 20}}>
            <Text>Proposer Votre Prix</Text>
            <TextInput
              label="donner votre prix "
              value={text}
              onChangeText={text => setText(text)}
              keyboardType="numeric"
              style={{marginBottom: 5}}
            />
            <Text>Entrer un message descriptif</Text>

            <TextInput
              label="message "
              value={message}
              onChangeText={text => setMessage(text)}
              multiline={true}
              numberOfLines={3}
            />

            <Pressable
              disabled={block}
              onPress={() => getOffreStatus(item._id, item.userId)}
              style={{
                justifyContent: 'center',
                backgroundColor: Color.primary,
                width: width / 3,
                borderRadius: 10,
                alignSelf: 'center',
                flex: 1,
                margin: 5,
              }}>
              <Text style={{textAlign: 'center', padding: 10}}>postuler</Text>
            </Pressable>
          </View>
    
      </Card>
    </ScrollView>
  );
};

export default MakeProposition;

const styles = StyleSheet.create({});
