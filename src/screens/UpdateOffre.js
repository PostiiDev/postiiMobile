import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  Avatar,
  Button,
  Card,
  ActivityIndicator,
  TextInput,
} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorMessage from '../components/ErrorMessage';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PaperSelect} from 'react-native-paper-select';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import {height, width} from '../utils/dimenion';
import {useRecoilValue} from 'recoil';
import {apiUrl} from '../atom/authtication';
import {useNavigation} from '@react-navigation/native';
const CreateOffreSchema = Yup.object().shape({
  title: Yup.string()
    .required('Le nom est requis*')
    .min(3, 'le nom  doit comporter au moins 3 caractères '),
  Description: Yup.string()
    .required('La Description est requis*')
    .min(3, 'le nom  doit comporter au moins 3 caractères ')
});
const UpdateOffre = ({route}) => {
  const {item} = route.params;
  const api = useRecoilValue(apiUrl);
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [refresh, setRefrech] = useState(false);
  const [date, setDate] = useState(new Date(item.deadLine));
  const [isPickerShow, setIsPickerShow] = useState(false);

  const takeimage = async () => {
    const result = await ImagePicker.launchImageLibrary();
    if (result.didCancel) {
      // Handle image selection cancellation
      Alert.alert('', "Vous devriez prendre des images pour l'offre");
      return;
    }
    // console.log('result:', result.assets);
    let {fileName, uri, fileSize} = result.assets[0];

    if (Platform.OS === 'android' && uri[0] === '/') {
      uri = `file://${uri}`;
      uri = uri.replace(/%/g, '%25');
    }
    let nameParts = fileName.split('.');
    let fileType = nameParts[nameParts.length - 1];
    var fileToUpload = {
      name: fileName,
      size: fileSize,
      uri: uri,
      type: 'application/' + fileType,
    };

    setFiles(() => fileToUpload);
    setFiles(() => fileToUpload);
  };
  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      validationSchema: CreateOffreSchema,
      initialValues: {
        title: item.title,
        Description: item.Description,
        category: item.category,
        deadLine: item.deadLine,
      },
      onSubmit: async values => {
        // if (files.length == 0) {
        //   Alert.alert('', "Vous devriez prendre des images pour l'offre");
        // } else {

        // console.log('values:', values);

        const data = new FormData();
        data.append('file', files);
        data.append('upload_preset', 'PFEOMAR');

        try {
          setLoading(() => true);
          //console.log('first image to upload! ', data);

          const xhr = new XMLHttpRequest();
          xhr.open(
            'POST',
            'https://api.cloudinary.com/v1_1/dagvldcli/image/upload',
          );
          xhr.onload = async () => {
            const {url} = JSON.parse(xhr.responseText);
            // console.log('url:', url);
            setImageUrl(() => url);
            let value = await AsyncStorage.getItem('user');
            let parsedValue = JSON.parse(value);
            //console.log('parsedValue:', parsedValue)
            let id = parsedValue.userInfo._id;
            // console.log('id:', id)
            // Once you have the URL, you can make the POST request to your server
            const postData = {
              title: values.title,
              Description: values.Description,
              category: values.category,
              deadLine: date,
              cover: url ? url : item.cover,
            };
            console.log('postData:', postData)

            let newurl = `${api}/api/offre/${item._id}/${id}`;
            console.log('newurl:', newurl)
            console.log('start possting.....',newurl );
            fetch(newurl, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postData),
            })
              .then(response => response.json())
              .then(data => {
                // Handle the response from the server
                // console.log('Response from server:', data);
                setLoading(false);
                showMessage({
                  message: 'offre est a jour avec success!',
                  type: 'success',
                });
                // Do something with the response if needed
                navigation.reset({
                  index: 0,
                  routes: [{name: 'AllOffre'}],
                });
              })
              .catch(error => {
                // console.log('Error:', error);
                // Handle the error if needed
                setLoading(false);
                showMessage({
                  message: 'Network request failed!',
                  type: 'danger',
                  backgroundColor: 'red',
                });
              });
          };
          xhr.onerror = error => {
            setLoading(() => false);
            showMessage({
              message: 'Network request failed! when upload image',
              type: 'danger',
              backgroundColor: 'red',
            });
          };
          xhr.send(data);
        } catch (err) {}
      },
    });

  const onChange = (event, value) => {
    setIsPickerShow(false);
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  const showPicker = () => {
    setIsPickerShow(true);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{textAlign: 'center', letterSpacing: 1.5, color: '#000'}}>
            Loading ...
          </Text>
          <Text
            style={{
              textAlign: 'center',
              letterSpacing: 1.5,
              marginTop: '5%',
              color: '#000',
            }}>
            veuillez patienter jusqu'à ce que nous téléchargions vos images ...
          </Text>
        </View>
      ) : (
        <ScrollView style={{padding: 10, flex: 1, marginBottom: 5}}>
          <Card>
            {item.cover.length > 0 ? (
              <Card.Cover
                source={{
                  uri: `${item.cover}`,
                }}
                style={{width: width, height: 150}}
                resizeMode="center"
              />
            ) : (
              <Card.Cover
                source={require('../assets/images/noImage.png')}
                resizeMode="center"
                style={{width: width, height: 100}}
              />
            )}
          </Card>
          <Button
            onPress={takeimage}
            mode="contained"
            style={{marginTop: '4%'}}>
            Pick Image{' '}
          </Button>

          <TextInput
            value={values.title}
            left={<TextInput.Icon icon="format-title" />}
            placeholder="Enter le titre de votre offre"
            autoCapitalize="none"
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            error={errors.title}
            touched={touched.title}
            style={styles.input}
          />
          <ErrorMessage errorValue={touched.title && errors.title} />
          <TextInput
            value={values.Description}
            left={<TextInput.Icon icon="subtitles-outline" />}
            placeholder="Enter la description de votre offre"
            autoCapitalize="none"
            onChangeText={handleChange('Description')}
            onBlur={handleBlur('Description')}
            error={errors.Description}
            touched={touched.Description}
            style={styles.input}
            multiline={true}
          />
          <ErrorMessage
            errorValue={touched.Description && errors.Description}
          />
          <TextInput
            value={values.category}
            left={<TextInput.Icon icon="subtitles-outline" />}
            placeholder="Enter la category de votre offre"
            autoCapitalize="none"
            onChangeText={handleChange('category')}
            onBlur={handleBlur('category')}
            error={errors.category}
            touched={touched.category}
            style={styles.input}
          />
          <ErrorMessage errorValue={touched.category && errors.category} />
    
          <Pressable
            onPress={() => showPicker()}
            style={styles.datePickerContainer}>
            <View style={styles.iconStyle}>
              <AntDesign name="calendar" size={25} color="#000" />
            </View>
            <View style={styles.input}>
              <Text
                style={[
                  styles.dateText,
                  // {color: dateColor ? 'red' : Color.secondary},
                ]}>
                {date.toLocaleDateString()}
              </Text>
              <Text style={{textAlign: 'left'}}>
                Selectionner votre date de livraison 
              </Text>

              {isPickerShow && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
            </View>
          </Pressable>

          <Button onPress={handleSubmit} mode="contained-tonal" style={{marginBottom:'3%'}}>
            mettre a jour votre  offre
          </Button>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default UpdateOffre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginHorizontal: height / 15,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  datePickerContainer: {
    marginBottom: 10,
    width: '90%',
    height: height/10,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    padding: 10,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },

  dateText: {
    // color: Color.secondary ,
    fontSize: 18,
  },
  input: {
    marginHorizontal: width / 10,
    marginVertical: 5,
    backgroundColor: '#fff',
  },

});
