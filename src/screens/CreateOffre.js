import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
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

import * as Yup from 'yup';
import {useFormik} from 'formik';
import {height, width} from '../utils/dimenion';
import {useRecoilValue} from 'recoil';
import {apiUrl} from '../atom/authtication';
const CreateOffreSchema = Yup.object().shape({
  title: Yup.string()
    .required('Le nom est requis*')
    .min(3, 'le nom  doit comporter au moins 3 caractères '),
  Description: Yup.string()
    .required('La Description est requis*')
    .min(3, 'le nom  doit comporter au moins 3 caractères '),
  category: Yup.string().required('La category est requis*'),
  deadLine: Yup.string().required('temp estimé est calculer par jours requis*'),
  prix: Yup.string().required('prix est requis*'),
});
const CreateOffre = () => {
  const api = useRecoilValue(apiUrl);
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
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

  const upload = async () => {
    const data = new FormData();
    data.append('file', files);
    data.append('upload_preset', 'PFEOMAR');
    // data.append("upload_preset", "default-preset");

    try {
      setLoading(() => true);
      console.log('first image to upload! ', data);

      const xhr = new XMLHttpRequest();
      xhr.open(
        'POST',
        'https://api.cloudinary.com/v1_1/dagvldcli/image/upload',
      );
      xhr.onload = () => {
        const {url} = JSON.parse(xhr.responseText);
        console.log('url:', url);
        console.log('url:', url);
        setImageUrl(() => url);
        setImageUrl(() => url);
        setLoading(false);

        return url;
      };
      xhr.onerror = error => {
        setLoading(() => false);

        console.log('err', error);
      };
      xhr.send(data);
    } catch (err) {
      console.log('err', err);
    }
  };
  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      validationSchema: CreateOffreSchema,
      initialValues: {
        title: 'Create your fiest offre with react naitve',
        Description: 'this should work',
        category: 'development',
        deadLine: '50',
        prix: '12',
      },
      onSubmit: async values => {
        if (files.length == 0) {
          Alert.alert('', "Vous devriez prendre des images pour l'offre");
        } else {
          console.log('values:', values);

          const data = new FormData();
          data.append('file', files);
          data.append('upload_preset', 'PFEOMAR');

          try {
            setLoading(() => true);
            console.log('first image to upload! ', data);

            const xhr = new XMLHttpRequest();
            xhr.open(
              'POST',
              'https://api.cloudinary.com/v1_1/dagvldcli/image/upload',
            );
            xhr.onload = () => {
              const {url} = JSON.parse(xhr.responseText);
              console.log('url:', url);
              setImageUrl(() => url);
              setLoading(false);

              // Once you have the URL, you can make the POST request to your server
              const postData = {
                title: 'Create your fiest offre with react naitve',
                Description: 'this should work',
                category: 'development',
                deadLine: +values.deadLine,
                prix: '120',
                cover: url,
              };
              console.log('postData:', postData);

              console.log('start possting.....');
              fetch(`${api}:5000/api/offre/647235c380928817876f2e0e`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
              })
                .then(response => response.json())
                .then(data => {
                  // Handle the response from the server
                  console.log('Response from server:', data);
                  // Do something with the response if needed
                })
                .catch(error => {
                  console.log('Error:', error);
                  // Handle the error if needed
                });
            };
            xhr.onerror = error => {
              setLoading(() => false);
              console.log('err', error);
            };
            xhr.send(data);
          } catch (err) {
            console.log('err', err);
          }
        }
      },
    });
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
            {files.length > 0 ? (
              <Card.Cover
                source={{
                  uri: `data:image/png;base64, ${result.assets[0].base64}`,
                }}
                style={{width: width, height: 100}}
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
          <TextInput
            value={values.deadLine}
            left={<TextInput.Icon icon="subtitles-outline" />}
            placeholder="Enter la date final de livraison par jours"
            autoCapitalize="none"
            onChangeText={handleChange('deadLine')}
            onBlur={handleBlur('deadLine')}
            error={errors.deadLine}
            touched={touched.deadLine}
            style={styles.input}
            keyboardType="numeric"
          />
          <ErrorMessage errorValue={touched.deadLine && errors.deadLine} />
          <TextInput
            value={values.prix}
            left={<TextInput.Icon icon="subtitles-outline" />}
            placeholder="Enter Votre prix"
            autoCapitalize="none"
            onChangeText={handleChange('prix')}
            onBlur={handleBlur('prix')}
            error={errors.prix}
            touched={touched.prix}
            style={styles.input}
            keyboardType="numeric"
          />
          <ErrorMessage errorValue={touched.prix && errors.prix} />
          <Button onPress={handleSubmit} mode="contained-tonal">
            Creer votre offre
          </Button>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default CreateOffre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginHorizontal: width / 10,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
});
