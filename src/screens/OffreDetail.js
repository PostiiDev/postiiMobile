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

const LeftContent = props => (
  <Avatar.Icon {...props} icon="lightbulb-on-outline" color="#fff" />
);

const OffreDetail = ({route}) => {
  // const {item} = route.params;
  console.log('item:', item);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [item, seti] = useState({
    _id: '6483a9e36c4a570b2c9c7db7',
    userId: '6483a0a74c134ea8c7537d07',
    title: 'web site',
    Description: 'create a web site for car location ',
    category: 'development',
    deadLine: '2023-07-09T22:07:58.744Z',
    cover:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    user: [],
    proposals: [
      {
        enterpriseId: [
          {
            _id: '6483a320b15deecdec65075a',
            name: 'khadija',
            email: 'khadija@gmail.com',
            password:
              '$2b$05$ILr1U6lNXT.7tjmMTIgb4eD1mdYlF9K7YI3QyV.6uIrZP6Iuibqcm',
            isEnterprise: false,
            phoneNumber: '76766865',
            myOffres: [],
            IBN: '464664646465',
            CNSS: '8686868655',
            matricule: '858586585858',
            img: '',
            createdAt: '2023-06-09T22:09:36.168Z',
            updatedAt: '2023-06-09T22:09:36.168Z',
            __v: 0,
          },
        ],
        price: 300,
        proposition: [
          {
            _id: '6483a9f46c4a570b2c9c7dbc',
            offreId: '6483a9e36c4a570b2c9c7db7',
            sellerId: ['6483a0a74c134ea8c7537d07'],
            buyerId: ['6483a320b15deecdec65075a'],
            status: false,
            prix: '300',
            msg: 'this offre intrested me a lot i have a lot of expeience in this filed and i make my propostion with a risenble price i hope you contact me ',
            createdAt: '2023-06-09T22:38:44.957Z',
            updatedAt: '2023-06-09T22:38:44.957Z',
            __v: 0,
          },
        ],
        _id: '6483a9f56c4a570b2c9c7dbe',
      },
      {
        enterpriseId: [
          {
            _id: '6483a320b15deecdec65075a',
            name: 'khadija',
            email: 'khadija@gmail.com',
            password:
              '$2b$05$ILr1U6lNXT.7tjmMTIgb4eD1mdYlF9K7YI3QyV.6uIrZP6Iuibqcm',
            isEnterprise: false,
            phoneNumber: '76766865',
            myOffres: [],
            IBN: '464664646465',
            CNSS: '8686868655',
            matricule: '858586585858',
            img: '',
            createdAt: '2023-06-09T22:09:36.168Z',
            updatedAt: '2023-06-09T22:09:36.168Z',
            __v: 0,
          },
        ],
        proposition: [
          {
            _id: '6483ae7eec138a4fc1a28885',
            offreId: '6483a9e36c4a570b2c9c7db7',
            sellerId: ['6483a0a74c134ea8c7537d07'],
            buyerId: ['6483a320b15deecdec65075a'],
            status: false,
            prix: '300',
            msg: 'this offre intrested me a lot i have a lot of expeience in this filed and i make my propostion with a risenble price i hope you contact me ',
            createdAt: '2023-06-09T22:58:06.211Z',
            updatedAt: '2023-06-09T22:58:06.211Z',
            __v: 0,
          },
        ],
        _id: '6483ae7eec138a4fc1a28887',
      },
    ],
    comments: [],
    createdAt: '2023-06-09T22:38:27.942Z',
    updatedAt: '2023-06-09T22:58:06.255Z',
    __v: 0,
  });

  const openModal = item => {
    console.log('item_id offre to supp:', item);
    setModalVisible(() => true);
  };

  const deleteOffre = async () => {
    console.log('offre supprimer');
    showMessage({
      message: 'offre a été supprimer avec success!',
      type: 'success',
    });
    navigation.navigate('AllOffre');
  };
  return (
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
                style={{flexDirection: 'row', width: '100%', borderRadius: 1}}>
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
          <Text variant="bodyMedium" style={{color: Color.secondary}}>
            {' '}
            {item.Description}
          </Text>

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
          onPress={() => openModal(item._id)}>
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
