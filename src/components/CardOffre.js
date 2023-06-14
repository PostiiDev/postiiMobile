import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {View, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../utils/Color';
import {width} from '../utils/dimenion';
import {useRecoilState, useRecoilValue} from 'recoil';
import {apiUrl, isAuthenticatedUser} from '../atom/authtication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const CardOffre = ({item}) => {
  const navigation = useNavigation();
  const [block, setBlock] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
    const api =useRecoilValue(apiUrl)
  const voirDetail = (id, sellerId) => {
    if (isAuthenticated) {
      navigation.navigate('MakeProposition', {item, id, sellerId });
      // getOffreStatus(id, sellerId);
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

  const getOffreStatus = async (id, sellerId) => {
    let result = await postulerOffre(id, sellerId);
    console.log('result: after send postuler to offre ====> ', result)
    if (result == 201) {
      showMessage({
        message: 'vous avez postuler a cet offre!',
        type: 'success',
      });
    }
    else if (result == 202) {
      showMessage({
        message: 'vous avez deja postuler a cet offre!',
        type: 'warning',
      });
    }
    else {
      showMessage({
        message: 'Network request failed!',
        type: 'danger',
        backgroundColor: 'red',
      });
    }
  };

  const postulerOffre = async (id, sellerId) => {
    console.log('Offre ID ==========> :', id)
    // prix: req.body.prix,
    // msg: req.body.msg,
    // title: req.title,
    // buyerId: req.body.buyerId,
    // sellerId: Off.userId,
    // offreId: req.params.id,
    setBlock(() => true);
    try {
      let value = await AsyncStorage.getItem('user');
      let parsedValue = JSON.parse(value);
      let userInfo = parsedValue.userInfo._id;
      let data = {
        prix: "3960",
        msg: 'i m realy intrested in this offre',
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

      <View style={{flexDirection: 'column'}}>
        <Text style={{paddingLeft: 10, color:Color.primary}}> categories : {item.category}</Text>

        <Text
          disabled={block}
          style={{paddingLeft: 10}}
          onPress={() => voirDetail(item._id, item.userId)}>
          {item.Description.length > 30
            ? item.Description.slice(0, 30).concat('...voir detail')
            : item.Description}
        </Text>
      </View>
      <Pressable
        disabled={block}
        onPress={() => voirDetail(item._id, item.userId)}
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
