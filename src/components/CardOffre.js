import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CardOffre = ({item}) => {
  const navigation = useNavigation();


  const voirDetail = () => {
    navigation.navigate('OffreDetail')
  }
  const postuler = async () => {
    console.log('postuler')
  }
  return (
    <Card key={item._id} style={{marginVertical: 4}}>
      <Card.Title title={item.title} />
      <Pressable onPress={voirDetail}>
        <Card.Cover source={{uri: item.cover != "" ? item.cover : 'https://picsum.photos/700'}} />
      </Pressable>

      <View style={{flexDirection: 'column'}}>
        <Text style={{paddingLeft: 10}}> categories : {item.category}</Text>

        <Text style={{paddingLeft: 10}}  onPress={voirDetail}>
          {item.Description.length > 30
            ? item.Description.slice(0, 30).concat('...voir detail')
            : item.Description}
        </Text>
        <Text style={{paddingLeft: 10}}> prix : {item.prix} dt</Text>

      </View>

      <Card.Actions>
        <Button onPress={postuler}>Postuler</Button>
      </Card.Actions>
    </Card>
  );
};

export default CardOffre;
