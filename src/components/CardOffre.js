import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../utils/Color';
import {width} from '../utils/dimenion';

const CardOffre = ({item}) => {
  const navigation = useNavigation();

  const voirDetail = () => {
    navigation.navigate('OffreDetail');
  };

  return (
    <Card key={item._id} style={{marginVertical: 4, marginHorizontal: '4%'}}>
      <Card.Title title={item.title} />
      <Pressable onPress={voirDetail}>
        <Card.Cover
          source={{
            uri: item.cover != '' ? item.cover : 'https://picsum.photos/700',
          }}
        />
      </Pressable>

      <View style={{flexDirection: 'column'}}>
        <Text style={{paddingLeft: 10}}> categories : {item.category}</Text>

        <Text style={{paddingLeft: 10}} onPress={voirDetail}>
          {item.Description.length > 30
            ? item.Description.slice(0, 30).concat('...voir detail')
            : item.Description}
        </Text>
        <Text style={{paddingLeft: 10}}> prix : {item.prix} dt</Text>
      </View>
      <Pressable
        onPress={() => voirDetail()}
        style={{
          justifyContent: 'flex-end',
          backgroundColor: Color.primary,
          width: width / 3,
          borderRadius: 10,
          alignSelf:'flex-end', flex:1,margin:5
        }}>
        <Text style={{textAlign: 'center', padding: 10}}>Voir Detail</Text>
      </Pressable>
    </Card>
  );
};

export default CardOffre;
