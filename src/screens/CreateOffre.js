import {StyleSheet, Text, View, Platform, Alert} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {Avatar, Button, Card, ActivityIndicator} from 'react-native-paper';

const CreateOffre = () => {
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
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{padding: 10}}>
          <Card>
            {files.length > 0 ? (
              <Card.Cover source={{uri: `data:image/png;base64, ${result.assets[0].base64}`}}  resizeMode="center"/>
            ) : (
              <Card.Cover
                source={require('../assets/images/noImage.png')}
                resizeMode="center"
              />
            )}
          </Card>
          <Button onPress={takeimage}>pick me</Button>
          <Button onPress={upload}>upload</Button>
        </View>
      )}
    </View>
  );
};

export default CreateOffre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
