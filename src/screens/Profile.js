import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import { width } from '../utils/dimenion';

const dummy_img =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png';
const bg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg';

const profilePictureWidth = Dimensions.get('window').width * 0.4;

// const ProfileScreenHeader = ({ user, isMe = false }) => {
//   const navigation = useNavigation();

//   const signOut = async () => {
//     console.warn("Sign out");
//   };

//   if (!user) {
//     return <ActivityIndicator />;
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: bg }} style={styles.bg} />
//       <Image source={{ uri: user?.image || dummy_img }} style={styles.image} />

//       <Text style={styles.name}>{user.name}</Text>

//       {isMe && (
//         <>
//           <View style={styles.buttonsContainer}>
//             <Pressable
//               style={[styles.button, { backgroundColor: "royalblue" }]}
//             >
//               <AntDesign name="pluscircle" size={16} color="white" />
//               <Text style={[styles.buttonText, { color: "white" }]}>
//                 Add to Story
//               </Text>
//             </Pressable>
//             <Pressable
//               style={styles.button}
//               onPress={() => navigation.navigate("Update Profile")}
//             >
//               <MaterialCommunityIcons name="pencil" size={16} color="black" />
//               <Text style={styles.buttonText}>Edit Profile</Text>
//             </Pressable>
//             <Pressable
//               onPress={signOut}
//               style={[styles.button, { flex: 0, width: 50 }]}
//             >
//               <MaterialIcons name="logout" size={16} color="black" />
//             </Pressable>
//           </View>
//         </>
//       )}

//       <View style={styles.textLine}>
//         <Entypo
//           name="graduation-cap"
//           size={18}
//           color="gray"
//           style={{ width: 25 }}
//         />
//         <Text>Graduated university</Text>
//       </View>

//       <View style={styles.textLine}>
//         <Ionicons name="time" size={18} color="gray" style={{ width: 25 }} />
//         <Text>Joined on October 2013</Text>
//       </View>

//       <View style={styles.textLine}>
//         <Entypo
//           name="location-pin"
//           size={18}
//           color="gray"
//           style={{ width: 25 }}
//         />
//         <Text>From Tenerife</Text>
//       </View>
//     </View>
//   );
// };

const Profile = () => {
  const route = useRoute();

  return (
    <ScrollView style={{flex: 1}}>
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
            {/* <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
            omittam deseruisse consequuntur ius an,
          </Text> */}
          <View style={{margin: '3%', width:width}}>
            <TextInput placeholder="votre nom"  style={{margin:10}}/>
            <TextInput placeholder="votre email"style={{margin:10}} />
            <TextInput placeholder="numéro du téléphone" style={{margin:10}}/>
         
          </View>
          </View>
        
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
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
