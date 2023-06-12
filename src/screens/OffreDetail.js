import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import moment from 'moment/min/moment-with-locales';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {width} from '../utils/dimenion';
import {Color} from '../utils/Color';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import Markdown from 'react-native-markdown-display';
import { useRecoilValue } from 'recoil';
import { apiUrl } from '../atom/authtication';
const LeftContent = props => (
  <Avatar.Icon {...props} icon="lightbulb-on-outline" color="#fff" />
);

const OffreDetail = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
const api = useRecoilValue(apiUrl)
  const openModal = item => {
    setModalVisible(() => true);
  };

  const deleteOffre = async () => {
    console.log('item._id', item._id);

    try {
      let result = await deleteItemById(item._id);
      console.log('result:', result);
      if (result.status == 1) {
        // Item deleted successfully
        showMessage({
          message: 'offre a été supprimer avec success!',
          type: 'success',
        });
        navigation.navigate('AllOffre');

        // Perform any additional actions, such as updating the UI
      } else {
        // Handle error if the item couldn't be deleted
        showMessage({
          message: 'Network request failed!',
          type: 'danger',
          backgroundColor: 'red',
        });
        navigation.navigate('AllOffre');
      }
    } catch (error) {
      showMessage({
        message: 'Network request failed!',
        type: 'danger',
        backgroundColor: 'red',
      });
      navigation.navigate('AllOffre');
    }
  };

  const deleteItemById = async itemId => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    let url = `${api}/api/offre/${itemId}`;
    try {
      let deleteItem = await fetch(url, requestOptions);
      return deleteItem.json();
    } catch (e) {}
  };
  return (
    <ScrollView>
      <Card
        style={{
          width: '95%',
          marginVertical: '2%',
          borderRadius: 10,
          alignSelf: 'center',
        }}
        key={item._id}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  êtes-vous sûr de vouloir supprimer cette offre ?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderRadius: 1,
                  }}>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => deleteOffre()}>
                    <Text style={styles.textStyle}>supprimer</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <Card.Title
          title={item.category}
          subtitle={moment(item.createdAt).locale('fr').fromNow()}
          left={LeftContent}
        />
        <Pressable>
          <Card.Cover
            source={{
              uri: item.cover ? item.cover : 'https://picsum.photos/700',
            }}
          />
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card.Content>
            <Text variant="titleLarge">{item.title}</Text>
            <Text variant="bodyMedium"> description :</Text>
            <Markdown
            >{item.Description}</Markdown>

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
        </View>
        <View style={{marginTop: '2%', paddingLeft: 20, flexDirection: 'row'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              textDecorationLine: 'underline',
            }}>
            consulter vos poroposition:{' '}
          </Text>
          <Text style={{color: 'green', fontSize: 18}}>
            {' '}
            {item.proposals.length}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: width / 1.4,

            marginBottom: '2%',
            alignSelf: 'center',
            marginTop: '3%',
          }}>
          <Pressable
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => navigation.navigate('OffreUpdate', {item})}>
            <AntDesign name="edit" color="#666" size={25} />
            <Text>Edit</Text>
          </Pressable>
          <Pressable
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => openModal(item._id)}>
            <AntDesign name="delete" color="red" size={25} />
            <Text>supprimer</Text>
          </Pressable>
        </View>
      </Card>
    </ScrollView>
  );
};

export default OffreDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 20,
  },
  buttonOpen: {
    backgroundColor: Color.secondary,
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
