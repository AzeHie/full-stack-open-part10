import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBar from './components/AppBar';
import useAuthStorage from './hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import useRepositories from './hooks/useRepositories';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const navigation = useNavigation();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { refetch } = useRepositories();

  const navigateToRepositoryList = () => {
    navigation.navigate('RepositoryList');
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    refetch();
    navigation.navigate('Main');
  };

  const handleNewReview = async () => {
    navigation.navigate('NewReview')
  }

  return (
    <View style={styles.container}>
      <AppBar
        onRepositoryListPress={navigateToRepositoryList}
        onSignInPress={navigateToSignIn}
        onSignOutPress={handleSignOut}
        onNewReviewPress={handleNewReview}
        />
    </View>
  );
};

export default Main;
