import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Card} from 'react-native-paper';
import {height} from '../utils/dimenion';
import {Color} from '../utils/Color';
import {useRecoilValue} from 'recoil';
import {apiUrl} from '../atom/authtication';
import {showMessage} from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
const PropostionCard = ({item, index}) => {
  const {enterpriseId, proposition} = item;
  const [modalVisible, setModalVisible] = useState(false);
  const api = useRecoilValue(apiUrl);
  const navigation = useNavigation()
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const accpetPropostion = async id => {
    let propostion = id._id;
    console.log('propostion:', propostion);
    fetch(`${api}/api/propo/${propostion}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers as needed
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
       
        navigation.reset({
          index: 0,
          routes: [{ name: "AllOffre" }],
        });
        showMessage({
          message: 'vous avez accepter  cet offre',
          type: 'success',
        });
        closeModal();
        navigation.reset({
          index: 0,
          routes: [{ name: "AllOffre" }],
        });
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
        closeModal();
        showMessage({
          message: 'Network request failed!',
          type: 'danger',
          backgroundColor: 'red',
        })
        navigation.reset({
          index: 0,
          routes: [{ name: "AllOffre" }],
        });
      });
  };
  return (
    <Card style={[styles.cardContainer]}>
      {enterpriseId?.map((elm, i) => {
        return (
          <View
            key={i}
            style={{flexDirection: 'row', padding: 15, alignSelf: 'center'}}>
            <Text style={[styles.title]}>{elm.name}: </Text>
            <Text style={[styles.title]}>({elm.email})</Text>
          </View>
        );
      })}

      <View>
        {proposition?.map((propo, j) => {
          return (
            <View
              key={j}
              style={{
                marginVertical: '1%',
                backgroundColor: propo.status ? '#1dd1a1' : '#fff',
                padding:10,
                borderRadius:10
              }}>
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
                      <Text style={styles.modalText}>Accepter cet offre </Text>
                      <View
                        style={{flexDirection: 'row', marginHorizontal: '2%'}}>
                        <Button onPress={() => closeModal()}>annuler</Button>

                        <Button onPress={() => accpetPropostion(propo)}>
                          confirmer
                        </Button>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
              <Text style={styles.text}>A proposer un offre </Text>
              <Text style={styles.text}>avec un prix de {propo.prix} dt</Text>
              <Text style={styles.text}>message : {propo.msg}</Text>
              <View
                style={{
                  padding: 15,
                  alignSelf: 'center',
                }}>
                {propo.status ? (
                  <Text style={styles.textconfirm}>
                    Vous avez Confirmer cet offre
                  </Text>
                ) : (
                  <Button onPress={() => openModal()}>
                    accpeter cet offre
                  </Button>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
};

export default PropostionCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: height / 2.8,
    width: '90%',
    alignSelf: 'center',
    marginVertical: '1%',
    padding: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  textconfirm: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing:1.2,
    textDecorationLine:'underline'
  },
});
