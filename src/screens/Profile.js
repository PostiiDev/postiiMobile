import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {TextInput, Switch} from 'react-native-paper';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState, useRecoilValue} from 'recoil';
import {isAuthenticatedUser} from '../atom/authtication';
import {height, width} from '../utils/dimenion';
import {Color} from '../utils/Color';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import ErrorMessage from '../components/ErrorMessage';
import {apiUrl} from '../atom/authtication';

const RegiterSchema = Yup.object().shape({
  email: Yup.string().email('L email est requis*').trim(),
  name: Yup.string()
    .min(3, 'le nom  doit comporter au moins 3 caractères ')
    .max(15, 'le nom doit comporter moins de 15 caractères')
    .matches(/^(?!\s*$).+/, 'Le nom est requis*'),
  phoneNumber: Yup.string()
    .max(8, 'numéro doit etre  8 chiffres*')
    .min(8, 'numéro doit etre  8 chiffres*'),
  isEnterprise: Yup.boolean(),

  IBN: Yup.string()
    .max(20, 'numéro doit etre  20 chiffres*')
    .min(8, 'numéro doit etre  8 chiffres*'),

  CNSS: Yup.string()
    .max(20, 'numéro CNSS doit etre  20 chiffres*')
    .min(8, 'numéro  CNSS doit etre  8 chiffres*'),
  matricule: Yup.string()
    .max(20, 'numéro matricule doit etre  20 chiffres*')
    .min(8, 'numéro  matricule doit etre  8 chiffres*'),
});
const Profile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocued = useIsFocused();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const url = useRecoilValue(apiUrl);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [IBN, setIBAN] = useState('');
  const [CNSS, setCNSS] = useState('');
  const [matricule, setMatricule] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [updated, setUpdated] = useState(false)
  useEffect(() => {
    if (isFocued) {
      getUSerInfo();
    }
  }, [isFocued, updated]);
  const logout = async () => {
    await AsyncStorage.clear();

    setIsAuthenticated(() => false);
  };
  const getUSerInfo = async () => {
    const information = await fetchUSerInformation();
    setUserInfo(information);
    setUserInfo(information);
    setName(() => information.name);
    setEmail(() => information.email);
    // setIsSwitchOn(() => information.isEnterprise);
    setIBAN(() => information.IBN);
    setCNSS(information.CNSS);
    setMatricule(() => information.matricule);
    setPhoneNumber(information.phoneNumber);
  };
  const fetchUSerInformation = async () => {
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

      let getUser = await fetch(`${url}/api/user/${id}`, requestOptions);
      let response = getUser.json();
      return response;
    } catch (e) {
      showMessage({
        message: 'Network request failed!',
        type: 'danger',
        backgroundColor: 'red',
        icon: 'danger',
      });
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const deleteProfile = (async = () => {
    Alert.alert('Alert ', 'Voulez-vous supprimer votre compte définitivement', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteUser()},
    ]);
  });
  const deleteUser = async () => {
    let value = await AsyncStorage.getItem('user');
    let parsedValue = JSON.parse(value);
    let id = parsedValue.userInfo._id;
    console.log('id:', id);
    fetch(`${url}/api/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(async data => {
        if (data.status == 1) {
          console.log('User deleted successfully.');
          await logout();

          showMessage({
            message: 'Votre compte a été supprimer',
            type: 'success',
            icon: 'success',
          });
          await logout();

          // Perform any additional actions after deleting the user
        } else {
          console.log('User deletion failed.');
          // Handle the failure scenario
          showMessage({
            message: 'netWork Failed!',
            color: 'warning',
            icon: 'warning',
          });
        }
      })
      .catch(error => {
        showMessage({
          message: 'netWork Failed!',
          color: 'warning',
          icon: 'warning',
        });
      });
  };


    const updateProfile = async () => {
      let updatedData = {
        name: name,
        email: email,
        isEnterprise: isSwitchOn,
        IBN: IBN,
        CNSS: CNSS,
        matricule: matricule,
        phoneNumber: phoneNumber,
      };
      console.log('updatedData:', updatedData);

      let value = await AsyncStorage.getItem('user');
      let parsedValue = JSON.parse(value);
      let id = parsedValue.userInfo._id;
      setLoading(true);
      fetch(`${url}/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Profile updated successfully:', data);
          // Perform any additional actions after updating the profile
          showMessage({
            message: 'Votre compte est a jour ',
            type: 'success',
            icon: 'success',
          });
          setUpdated(()=> !updated)
        })
        .catch(error => {
          showMessage({
            message: 'Network failed !',
            color: 'warning',
            icon: 'warning',
          }); // Handle any error that occurred during the update process
        });
    }
  return (
    <KeyboardAvoidingView style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Color.primary} size="small" />
          <Text style={{paddingTop: '4%'}}>Loading ...</Text>
        </View>
      ) : (
        <ScrollView style={{flex: 1}}>
          <TouchableWithoutFeedback
            style={{flex: 1}}
            onPress={loading ? null : Keyboard.dismiss}
            disabled={loading}>
            <View>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../assets/logo/logo.png')}
                  resizeMode="stretch"
                />
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.title}>Modifier Votre profil</Text>
              </View>

              <View style={styles.switchContainer}>
                <Switch
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  color={Color.primary}
                />
                <Text style={styles.switchText}>Tant que enterprise</Text>
              </View>
              <TextInput
                value={name}
                left={<TextInput.Icon icon="account" />}
                placeholder="Enter votre nom"
                autoCapitalize="none"
                onChangeText={text => setName(text)}
                style={styles.input}
              />
              <TextInput
                value={email}
                left={<TextInput.Icon icon="email" />}
                placeholder="Enter your email"
                autoCapitalize="none"
                onChangeText={text => setEmail(text)}
                style={styles.input}
              />

              <TextInput
                value={phoneNumber}
                left={<TextInput.Icon icon="phone" />}
                placeholder="Enter votre numérto du telephone"
                autoCapitalize="none"
                onChangeText={text => setPhoneNumber(text)}
                style={styles.input}
                maxLength={8}
                keyboardType="numeric"
              />

              {isSwitchOn && (
                <>
                  <TextInput
                    value={IBN}
                    left={<TextInput.Icon icon="subtitles-outline" />}
                    placeholder="Enter votre IBN"
                    autoCapitalize="none"
                    onChangeText={text => setIBAN(text)}
                    style={styles.input}
                    maxLength={20}
                    keyboardType="numeric"
                  />
                  <TextInput
                    value={CNSS}
                    left={<TextInput.Icon icon="subtitles-outline" />}
                    placeholder="Enter votre CNSS"
                    autoCapitalize="none"
                    onChangeText={text => setCNSS(text)}
                    style={styles.input}
                    maxLength={20}
                    keyboardType="numeric"
                  />
                  <TextInput
                    value={matricule}
                    left={<TextInput.Icon icon="subtitles-outline" />}
                    placeholder="Enter votre matricule"
                    autoCapitalize="none"
                    onChangeText={text => setMatricule(text)}
                    style={styles.input}
                    maxLength={20}
                    keyboardType="numeric"
                  />
                </>
              )}
              <TouchableOpacity
                onPress={updateProfile}
                style={[styles.customButton, loading && {opacity: 0.5}]}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={Color.white} size="small" />
                ) : (
                  <Text style={styles.customButtonText}>Mettre a jour</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteProfile}
                style={[
                  styles.customButton,
                  loading && {opacity: 0.5},
                  {backgroundColor: 'red'},
                ]}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={Color.white} size="small" />
                ) : (
                  <Text style={[styles.customButtonText]}>
                    Supprimer votre profile
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  logoContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  logo: {
    width: width / 2.5,
    height: height / 4.5,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: height / 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Color.black,
  },
  input: {
    marginHorizontal: width / 10,
    marginVertical: 5,
    backgroundColor: Color.white,
  },
  customButton: {
    backgroundColor: Color.primary,
    marginHorizontal: width / 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 5,
  },
  customButtonText: {
    color: Color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '3%',
    alignItems: 'center',
  },
  switchText: {
    marginLeft: '3%',
    fontSize: 16,
  },
  forgotContainer: {
    flexDirection: 'row',
    // marginTop: '8%',
    marginBottom: '8%',
    justifyContent: 'flex-end',
    padding: '3%',
    alignSelf: 'center',
  },
  forgotText: {
    fontSize: 14,
    color: Color.primaryColor,
    paddingRight: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
  },
});

export default Profile;
