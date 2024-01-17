import { StyleSheet, View } from 'react-native';
import Text from './Text';

const AppBarTab = ({ tabText }) => {
  const styles = StyleSheet.create({
    text: {
      flexGrow: 0,
      color: 'white',
      marginLeft: 10,
      paddingTop: 3,
      paddingBottom: 3,
    },
  });

  return (
    <View>
      <Text style={styles.text}>{tabText}</Text>
    </View>
  );
};

export default AppBarTab;
