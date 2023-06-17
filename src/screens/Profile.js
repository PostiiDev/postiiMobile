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
  Alert
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {TextInput, Switch} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
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
  email: Yup.string()
    .email('L email est requis*')
    .required('L email est requis*')
    .trim(),
  name: Yup.string()
    .required('Le nom est requis*')
    .min(3, 'le nom  doit comporter au moins 3 caractères ')
    .max(15, 'le nom doit comporter moins de 15 caractères')
    .matches(/^(?!\s*$).+/, 'Le nom est requis*'),
  phoneNumber: Yup.string()
    .required('numero du telephone obligatoir*')
    .max(8, 'numéro doit etre  8 chiffres*')
    .min(8, 'numéro doit etre  8 chiffres*')
    .required('Numéro de téléphone obligatoire*'),
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
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const url = useRecoilValue(apiUrl);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUSerInfo();
  }, []);

  const getUSerInfo = async () => {
    const information = await fetchUSerInformation();
    console.log('info:', information.name)
    setUserInfo(information);
    setUserInfo(information);
    setIsSwitchOn(() => information.isEnterprise);
    console.log('is switched on !', isSwitchOn)


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
      });
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const deleteProfile = async = () => {
    Alert.alert('Alert ', 'Voulez-vous supprimer votre compte définitivement', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      validationSchema: RegiterSchema,
      initialValues: {
        name: userInfo.name ? userInfo.name : '',
        email: userInfo.email ? userInfo.email : '',
        isEnterprise: isSwitchOn,
        IBN: userInfo.IBN ? userInfo.IBN : '',
        CNSS: userInfo.CNSS ? userInfo.CNSS : '',
        matricule: userInfo.matricule ? userInfo.matricule : '',
        phoneNumber: userInfo.phoneNumber ? userInfo.phoneNumber : '',
      },

      onSubmit: async values => {
        console.log('values:', values);
        //setLoading(true);
      },
    });
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
                <Text style={styles.title}>S'inscrire</Text>
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
              value={values.name}
                left={<TextInput.Icon icon="account" />}
                placeholder="Enter votre nom"
                autoCapitalize="none"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={errors.name}
                touched={touched.name}
                style={styles.input}
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
              <TextInput
                value={values.email}
                left={<TextInput.Icon icon="email" />}
                placeholder="Enter your email"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                style={styles.input}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />

              <TextInput
                value={values.phoneNumber}
                left={<TextInput.Icon icon="phone" />}
                placeholder="Enter votre numérto du telephone"
                autoCapitalize="none"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                style={styles.input}
                maxLength={8}
                keyboardType="numeric"
              />
              <ErrorMessage
                errorValue={touched.phoneNumber && errors.phoneNumber}
              />

              {isSwitchOn && (
                <>
                  <TextInput
                    value={values.IBN}
                    left={<TextInput.Icon icon="subtitles-outline" />}
                    placeholder="Enter votre IBN"
                    autoCapitalize="none"
                    onChangeText={handleChange('IBN')}
                    onBlur={handleBlur('IBN')}
                    error={errors.IBN}
                    touched={touched.IBN}
                    style={styles.input}
                    maxLength={20}
                    keyboardType="numeric"
                  />
                  <ErrorMessage errorValue={touched.CNSS && errors.CNSS} />
                  <TextInput
                    value={values.CNSS}
                    left={<TextInput.Icon icon="subtitles-outline" />}
                    placeholder="Enter votre CNSS"
                    autoCapitalize="none"
                    onChangeText={handleChange('CNSS')}
                    onBlur={handleBlur('CNSS')}
                    error={errors.CNSS}
                    touched={touched.CNSS}
                    style={styles.input}
                    maxLength={20}
                    keyboardType="numeric"
                  />
                  <ErrorMessage errorValue={touched.CNSS && errors.CNSS} />
                  <TextInput
                    value={values.matricule}
                    left={<TextInput.Icon icon="subtitles-outline" />}
                    placeholder="Enter votre matricule"
                    autoCapitalize="none"
                    onChangeText={handleChange('matricule')}
                    onBlur={handleBlur('matricule')}
                    error={errors.matricule}
                    touched={touched.matricule}
                    style={styles.input}
                    maxLength={20}
                    keyboardType="numeric"
                  />
                  <ErrorMessage
                    errorValue={touched.matricule && errors.matricule}
                  />
                </>
              )}
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.customButton, loading && {opacity: 0.5}]}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={Color.white} size="small" />
                ) : (
                  <Text style={styles.customButtonText}>Update</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteProfile}
                style={[styles.customButton, loading && {opacity: 0.5,}, {backgroundColor:'red'}]}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={Color.white} size="small" />
                ) : (
                  <Text style={[styles.customButtonText]}>Delete you Profile</Text>
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
