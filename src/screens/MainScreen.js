
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';

const MainScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bottomTab}>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={require('')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MainScreen;
