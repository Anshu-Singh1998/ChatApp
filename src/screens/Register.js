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
import firestore, {firebase} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        userId: userId,
      })
      .then(res => {
        console.log('User Created');
        navigation.navigate("Login")
      })
      .catch(err => {
        console.log(err);
      });
  };

  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (mobile == '') {
      isValid = false;
    }
    if (password == '') {
      isValid = false;
    }
    if (confirmPassword == '') {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Enter Name"
        style={[styles.input, {marginTop: 50}]}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 20}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Mobile"
        keyboardType="number-pad"
        style={[styles.input, {marginTop: 20}]}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        style={[styles.input, {marginTop: 20}]}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please enter all correct details');
          }
        }}>
        <Text style={styles.saveBtnText}>Submit</Text>
      </TouchableOpacity>
      <Text
        style={styles.OrLoginTexr}
        onPress={() => navigation.navigate('Login')}>
        Or Login
      </Text>
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
    marginTop: 50,
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
export default Register;
