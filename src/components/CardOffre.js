import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CardOffre = ({item}) => {
  const navigation = useNavigation();

  
  const voirDetail = () => {
    navigation.navigate('OffreDetail')
  }
  return (
    <Card key={item._id} style={{marginVertical: 4}}>
      <Card.Title title={item.title} />
      <Pressable onPress={voirDetail}>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Pressable>

      <View style={{flexDirection: 'column'}}>
        <Text style={{padding: 10}}> categories : {item.category}</Text>

        <Text style={{padding: 16}}  onPress={voirDetail}>
          {item.Description.length > 30
            ? item.Description.slice(0, 30).concat('...voir detail')
            : item.Description}
        </Text>
      </View>

      <Card.Actions>
        <Button>Postuler</Button>
      </Card.Actions>
    </Card>
  );
};

export default CardOffre;
