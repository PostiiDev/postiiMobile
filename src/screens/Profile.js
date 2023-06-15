import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import { width } from '../utils/dimenion';


const profilePictureWidth = Dimensions.get('window').width * 0.4;



const Profile = () => {
  const route = useRoute();

  return (
    <ScrollView style={{flex: 1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar2.png',
              }}
            />
            <Text style={styles.name}>John Doe</Text>
          </View>
        </View>

        <View style={styles.profileDetail}>
          <View style={styles.detailContent}>
            <Text style={styles.title}>Offre</Text>
            <Text style={styles.count}>5</Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.title}>Proposition</Text>
            <Text style={styles.count}>142</Text>
          </View>
        </View>

        <View style={styles.body}>
          
          <View style={styles.bodyContent}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Edit </Text>
            </TouchableOpacity>
     
          <View style={{margin: '3%', width:width}}>
            <TextInput placeholder="votre nom"  style={{marginHorizontal:30, }}/>
            <TextInput placeholder="votre email" style={{marginHorizontal:30,}} />
            <TextInput placeholder="numéro du téléphone" style={{marginHorizontal:30, }}/>
         
          </View>
          </View>
        
        </View>
        <View style={{alignSelf:'center',backgroundColor:'#00CED1', borderRadius:10}}>
        <Text style={{paddingHorizontal:30, padding:10, color:"fff", fontSize:18}}>Submit</Text>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  bg: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: -profilePictureWidth / 2,
  },
  image: {
    width: profilePictureWidth,
    aspectRatio: 1,
    borderRadius: 500,
    borderWidth: 5,
    borderColor: 'white',
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 5,
  },
  buttonsContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
  },
  button: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
    margin: 5,
    padding: 7,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    marginHorizontal: 5,
    fontWeight: '500',
  },
  textLine: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
  },
  sectionTitle: {
    marginLeft: 10,
    marginVertical: 5,
    fontWeight: '500',
    fontSize: 18,
  },
  header: {},
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#00CED1',
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00CED1',
  },
  description: {
    fontSize: 20,
    color: '#00CED1',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Profile;
