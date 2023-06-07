import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {View, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../utils/Color';
import {width} from '../utils/dimenion';
import {useRecoilState} from 'recoil';
import {isAuthenticatedUser} from '../atom/authtication';

const CardOffre = ({item}) => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
  const voirDetail = (id) => {
    if (isAuthenticated) {
      //navigation.navigate('OffreDetail');
      console.log('Ofrre id in Card Offre:', id)
      getOffreStatus(id)

    } else {
      Alert.alert('Note', "vous devez vous inscrire pour voir l'offre", [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'register',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    }
  };

  getOffreStatus = async () => {
    let result = postulerOffre(id);
    console.log('result:', result)
  };
  const postulerOffre = async (id) => {
    console.log('id:', id)
    let data = {};

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
      };
      let url = '';
      let result = await fetch(url, requestOptions);
      return result.json();
    } catch (e) {}
  };

  return (
    <Card key={item._id} style={{marginVertical: 4, marginHorizontal: '4%'}}>
      <Card.Title title={item.title} />
      <Pressable onPress={()=> voirDetail(item._id)}>
        <Card.Cover
          source={{
            uri: item.cover != '' ? item.cover : 'https://picsum.photos/700',
          }}
        />
      </Pressable>

      <View style={{flexDirection: 'column'}}>
        <Text style={{paddingLeft: 10}}> categories : {item.category}</Text>

        <Text style={{paddingLeft: 10}} onPress={()=> voirDetail(item._id)}>
          {item.Description.length > 30
            ? item.Description.slice(0, 30).concat('...voir detail')
            : item.Description}
        </Text>
        <Text style={{paddingLeft: 10}}> prix : {item.prix} dt</Text>
      </View>
      <Pressable
        // disabled={!isAuthenticated}
        onPress={() =>voirDetail(item._id)}
        style={{
          justifyContent: 'flex-end',
          backgroundColor: Color.primary,
          width: width / 3,
          borderRadius: 10,
          alignSelf: 'flex-end',
          flex: 1,
          margin: 5,
        }}>
        <Text style={{textAlign: 'center', padding: 10}}>Postuler</Text>
      </Pressable>
    </Card>
  );
};

export default CardOffre;
