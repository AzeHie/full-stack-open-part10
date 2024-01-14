import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#000000BF'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabText="REPOSITORIES" />
      <AppBarTab tabText="ABOUT" />
    </View>
  );
};

export default AppBar;
