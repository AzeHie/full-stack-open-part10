import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import PressableTab from './PressableTab';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#000000BF',
  },
});

const AppBar = ({ onRepositoryListPress, onSignInPress, onSignOutPress, onSignUpPress, onNewReviewPress }) => {
  const { data } = useQuery(GET_USER);

  if (!data) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  const user = data.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <PressableTab onPress={onRepositoryListPress}>
          <AppBarTab tabText='REPOSITORIES' />
        </PressableTab>
        {!user && (
          <PressableTab onPress={onSignInPress}>
            <AppBarTab tabText='SIGN IN' />
          </PressableTab>
        )}
        {!user && (
          <PressableTab onPress={onSignUpPress}>
            <AppBarTab tabText='SIGN UP' />
          </PressableTab>
        )}
        {user && (
          <PressableTab onPress={onSignOutPress}>
            <AppBarTab tabText='LOG OUT' />
          </PressableTab>
        )}
        {user && (
        <PressableTab onPress={onNewReviewPress}>
          <AppBarTab tabText='ADD REVIEW' />
        </PressableTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
