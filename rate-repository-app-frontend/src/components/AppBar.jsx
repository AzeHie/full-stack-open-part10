import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import PressableTab from './PressableTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#000000BF',
  },
});

const AppBar = ({ onRepositoryListPress, onSignInPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <PressableTab onPress={onRepositoryListPress}>
          <AppBarTab tabText='REPOSITORIES' />
        </PressableTab>
        <PressableTab onPress={onSignInPress}>
          <AppBarTab tabText='SIGN IN' />
        </PressableTab>
        <PressableTab onPress={onSignInPress}>
          <AppBarTab tabText='RANDOM TAB' />
        </PressableTab>
        <PressableTab onPress={onSignInPress}>
          <AppBarTab tabText='RANDOM TAB 2' />
        </PressableTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
