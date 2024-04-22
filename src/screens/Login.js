import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const loginUser = () => {
    setVisible(true);
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        console.log(JSON.stringify(res.docs[0].data()));
        goToNext(
          res.docs[0].data().name,
          res.docs[0].data().email,
          res.docs[0].data().userId,
        );
        // console.log(JSON.stringify(res.docs));
        // if (res.docs !== []) {
        //   console.log(JSON.stringify(res.docs[0].data()));
        // } else {
        //   Alert.alert('User not Found');
        // }
      })
      .catch(err => {
        setVisible(false);
        console.log(err);
        Alert.alert('User not Found');
      });
  };

  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('Name', name);
    await AsyncStorage.setItem('Email', email);
    await AsyncStorage.setItem('UserID', userId);
    navigation.navigate('MainScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 20}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          loginUser();
        }}>
        <Text style={styles.saveBtnText}>Submit</Text>
      </TouchableOpacity>
      <Text
        style={styles.OrLoginTexr}
        onPress={() => navigation.navigate('Register')}>
        Or Sign Up
      </Text>
      <Loader visible={visible} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    color: '#000',
    alignSelf: 'center',
    marginTop: 100,
    fontWeight: '600',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 3,
    borderRadius: 10,

    alignSelf: 'center',
    paddingLeft: 20,
  },
  saveBtn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'purple',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 20,
  },
  OrLoginTexr: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 20,
    fontWeight: '600',
    color: '#000',
  },
});
export default Login;
