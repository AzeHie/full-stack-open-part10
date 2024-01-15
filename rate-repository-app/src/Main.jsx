import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBar from './components/AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const navigation = useNavigation();

  const navigateToRepositoryList = () => {
    navigation.navigate('RepositoryList');
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <AppBar
        onRepositoryListPress={navigateToRepositoryList}
        onSignInPress={navigateToSignIn}
        />
        <Text>Rate Repository App</Text>
    </View>
  );
};

export default Main;
