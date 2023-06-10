import React, {useState, useRef} from 'react';
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
} from 'react-native';
import {TextInput, Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
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

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email*').required('Required*').trim(),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters!')
    .required('Password is required'),
});

export const Login = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);

  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const password = useRef(null);
  const [loading, setLoading] = useState(false);
  const url = useRecoilValue(apiUrl);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async values => {
        setLoading(true);
        try {
          const api = `${url}/api/auth/login`;
          const response = await fetch(api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          const data = await response.json();
          const status = response.status;

          if (status === 200) {
            showMessage({
              message: 'Success!',
              type: 'success',
            });
            await AsyncStorage.setItem('user', JSON.stringify(data));
            setIsAuthenticated(()=> true);
          }
        } catch (error) {
          showMessage({
            message: 'Network request failed!',
            type: 'danger',
            backgroundColor: 'red',
          });
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      },
    });

  return (
    <KeyboardAvoidingView style={styles.container}>
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
            <Text style={styles.title}>Se connecter</Text>
          </View>

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
            value={values.password}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-off'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            left={<TextInput.Icon icon="form-textbox-password" />}
            placeholder="Enter your password"
            secureTextEntry={passwordVisible}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            style={styles.input}
            ref={password}
          />
          <ErrorMessage errorValue={touched.password && errors.password} />

          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.customButton, loading && {opacity: 0.5}]}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color={Color.white} size="small" />
            ) : (
              <Text style={styles.customButtonText}>Se connecter</Text>
            )}
          </TouchableOpacity>

          <View style={styles.switchContainer}>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color={Color.primary}
            />
            <Text style={styles.switchText}>Remember Me</Text>
          </View>

          <View style={styles.forgotContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.forgotText}>
                don't have and account ?
                <Text style={{fontWeight: 'bold', color: Color.primary}}>
                  Register
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 8,
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
});

export default Login;
